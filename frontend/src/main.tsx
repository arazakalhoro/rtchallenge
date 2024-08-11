import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/inter";
import "./index.css";
import AuthContextProvider from "./Modules/Context/AuthContext.tsx";
import ToastContextProvider from "./Modules/Context/ToastContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(

  
  <React.StrictMode>
    <ToastContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
);
