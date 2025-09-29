import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Only BrowserRouter here, NOT inside App */}
    <App />
  </React.StrictMode>
);
