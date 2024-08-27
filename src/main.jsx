import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { GeneralContext } from "./store/GeneralContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContext>
        <App />
      </GeneralContext>
    </BrowserRouter>
  </React.StrictMode>
);
