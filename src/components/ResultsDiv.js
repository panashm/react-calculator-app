import React from "react"
import { Container, Row } from "react-bootstrap";


function ResultsDiv(props) {
  const gotRate = props.baseRate;

  if (gotRate) {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <h5>= {props.conversion} {props.toCurrency}</h5>
            <br/>
            <div className="moreInfo">
              <p>Exchange rate: 1 {props.fromCurrency} = {props.baseRate} {props.toCurrency}</p>
              <p>Paytron exchange rate: 1 {props.fromCurrency} = {props.paytronRate} {props.toCurrency} </p>
              <p>Transaction fee: {props.fee} {props.toCurrency}</p>
            </div>
            <br/><br/><br/><br/>
            <p className="smallFont">Updated {props.dateFormat} </p>
          </Row>
        </Container>
        <br/>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default ResultsDiv