import "./App.css";
import React from "react";

import {useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContextProvider from "./Modules/Context/AuthContext";
import { AnimatePresence } from "framer-motion";
import RouterApp from "./Modules/AuthenticationModule/RouterSinglePageApp/RouterApp";


function App() {

  return (
    // <AnimatePresence exitBeforeEnter>
    <AuthContextProvider>
      <div className="App">
        <ToastContainer />
        <AnimatePresence>
          <RouterApp/>
        </AnimatePresence>
      </div>
    </AuthContextProvider>
    // </AnimatePresence>
  )
}


export default App;
