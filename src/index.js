import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
// import { ContextProvider } from "./components/SocketContext";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
