import React, { useState } from "react"
import Header from "./Header"
import InputAmount from "./InputAmount"
import ResultsDiv from "./ResultsDiv"
import LoadingIndicator from "./Loader.js";
import axios from "axios"
import { trackPromise } from "react-promise-tracker";
import { Container } from "react-bootstrap";


const ConverterContainer = props => {

  var today  = new Date();
  var options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
  // State for date field when updating every 30 seconds
  const [date, setDate] = useState(today.toLocaleDateString("en-US", options));

  // State for all outputs 
  const [outputs, setOutputs] = useState({
    result: "",
    baseRate: "",
    paytronRate: "",
    paytronFee: "",
    toCurrency: "",
    fromCurrency:"",
  });

  const doConversion = (amount, from, to) => {

    const addMarkup = (responseAmount, rate, pair) => {
      var resultAdjusted = (responseAmount * 0.995).toFixed(2);
      var fee = (responseAmount - resultAdjusted).toFixed(2);
      var rateAdjusted = (rate * 0.995).toFixed(4);
      var firstCurrency = pair.substring(0,3);
      
      // Check if we need to invert the rate based on currency pair
      if (firstCurrency !== from){
        rate = 1/rate; 
        rate = rate.toFixed(4);
        rateAdjusted = (rate * 0.995).toFixed(4);
      } 
      
      // Update state
      setOutputs({
        baseRate: rate,
        paytronRate: rateAdjusted,
        paytronFee: fee,
        result: resultAdjusted,
        toCurrency: to,
        fromCurrency: from,
      });
    }

    // Build API query string
    var query = "https://wnvgqqihv6.execute-api.ap-southeast-2.amazonaws.com/Public/public/rates?Sell="+from+"&Buy="+to+"&Amount="+amount+"&Fixed=sell"

    const fetchData = () => {  
      return trackPromise(axios.get(query)
        .then((response) => {
          //console.log(response.data)
          addMarkup(response.data["clientBuyAmount"], response.data["midMarketRate"], response.data["currencyPair"]);

          // Set state new date update
          var now  = new Date();
          setDate(now.toLocaleDateString("en-US", options));
        }));
    }

    fetchData();
  };

  return (
    <div>
      <Header />
      <Container>
        <div className = "mainBack mx-auto">
          <InputAmount tryConversion={doConversion} />
          <div className="loadingWrapper">
            <LoadingIndicator/>
          </div>
          <ResultsDiv 
            conversion={outputs.result} 
            baseRate={outputs.baseRate}
            paytronRate={outputs.paytronRate}
            fee={outputs.paytronFee}
            toCurrency={outputs.toCurrency}
            fromCurrency={outputs.fromCurrency}
            dateFormat={date}
          />
        </div>
      </Container>
    </div>
  )
}

export default ConverterContainer