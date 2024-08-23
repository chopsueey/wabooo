import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { GeneralContext } from "./store/GeneralContext.jsx";
import { BrowserRouter } from "react-router-dom";

const ENVIRONMENT = "production"; // or "development"

export const DOMAIN =
  ENVIRONMENT === "development"
    ? "http://localhost:5000"
    : "https://wabooo-server.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContext>
        <App />
      </GeneralContext>
    </BrowserRouter>
  </React.StrictMode>
);
