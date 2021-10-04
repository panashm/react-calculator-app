import React from "react"
import ReactDOM from "react-dom"
//component file
import ConverterContainer from "./components/ConverterContainer"
//stylesheets
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <ConverterContainer />
  </React.StrictMode>,
  document.getElementById("root")
)