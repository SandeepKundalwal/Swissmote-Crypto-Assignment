import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from './Components/WalletContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameScreen from './Components/GameScreen';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <WalletProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game-screen" element={<GameScreen />} />
      </Routes>
      </WalletProvider>
    </Router>
  </React.StrictMode>
);

//******    **                  **           ********                  **
///*////**  /**                 /**          /**/////          ******  /**
///*   /**  /**  ******   ***** /**  **      /**       **   **/**///** /**  ******  ******  *****  ******
///******   /** **////** **///**/** **       /******* //** ** /**  /** /** **////**//**//* **///**//**//*
///*//// ** /**/**   /**/**  // /****        /**////   //***  /******  /**/**   /** /** / /******* /** /
///*    /** /**/**   /**/**   **/**/**       /**        **/** /**///   /**/**   /** /**   /**////  /**
///*******  ***//****** //***** /**//**      /******** ** //**/**      ***//****** /***   //******/***
/////////  ///  //////   /////  //  //       //////// //   // //      ///  //////  ///     ////// ///
reportWebVitals();
