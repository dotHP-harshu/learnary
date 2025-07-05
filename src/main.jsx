import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sw-listener";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
