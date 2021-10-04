import React, { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { usePromiseTracker } from "react-promise-tracker";


const InputAmount = props => {
  // State for all the inputs
  const [inputText, setInputText] = useState({
    amount: "",
    fromCurrency: "AUD",
    toCurrency: "USD",
  });

  // State for validating fields
  const [ errors, setErrors ] = useState({})
  
  // Event for changes in amount text box
  const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });

    // Check to see if errors exist then remove them from the object
    if ( !!errors["amount"] ) setErrors({
      ...errors,
      "amount": null
    })
  };

  // Status of API call
  const { promiseInProgress } = usePromiseTracker();

  // Function to get API data
  const pollData = () =>{
    if (promiseInProgress) {
      alert("API Call in progress");
    } else {
      if (inputText.amount){
        props.tryConversion(inputText.amount, inputText.fromCurrency, inputText.toCurrency);
      } 
    }
  }

  const findFormErrors = () => {
    const amount = inputText["amount"]
    const newErrors = {}
    // amount errors
    if ( !amount || amount === "" ) newErrors.amount = "cannot be blank!";
    else if (isNaN(amount)) newErrors.amount = "Please enter a number!";
    return newErrors
  }

  // Run and update rates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      pollData();
    }, 30000);
    return () => clearInterval(interval);
  });
   
  // Event for when we convert the currency
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors()

    // Check length of errors object
    if ( Object.keys(newErrors).length > 0 ) {
      // Found errors
      setErrors(newErrors)
    } else {
      if (inputText.fromCurrency === inputText.toCurrency){
        alert("Cannot convert to the same currency");
      } else {
        pollData();    
      }
    }
  };

  // Event for change in drop down currency selectors
  const handleChange = e => {
    setInputText({ 
      ...inputText,
      [e.target.name]: e.target.value 
    });
  }

  return (
    <div>
      <Container>
        <br/>
        <h3 className="display-6">Convert Currency</h3>
        <br/><br/>
        <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col xs="auto">
          <Form.Group controlId="validationCustom04">
            <Form.Label >
              <b>Amount</b>
            </Form.Label>
            <Form.Control 
              className="mb-2"
              type="text" 
              placeholder="Enter Amount" 
              value={inputText.amount} 
              name="amount"
              onChange={onChange}
              isInvalid={ !!errors.amount }
            />
            <Form.Control.Feedback type="invalid">
              { errors.amount }
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Label >
              <b>From</b>
            </Form.Label>
            <Form.Select className="mb-2" name="fromCurrency" value={inputText.fromCurrency} onChange={handleChange}>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Great British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Label >
              <b>To</b>
            </Form.Label>
            <Form.Select name="toCurrency" value={inputText.toCurrency} onChange={handleChange}>
              <option value="USD">USD - US Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Great British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
            </Form.Select>
          </Col>
          <Col md="2"><Button className="submitBtn" type="submit" variant="primary">Convert</Button></Col>
        </Row>
      </Form>
    </Container>
  </div>
  )
}

export default InputAmount