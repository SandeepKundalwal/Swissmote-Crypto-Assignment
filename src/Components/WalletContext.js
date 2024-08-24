import React, { createContext, useState, useContext } from 'react';

// Create Context
const WalletContext = createContext();

// Create a Provider Component
export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom Hook for using Wallet Context
export const useWallet = () => {
  return useContext(WalletContext);
};





















// const [walletAddress, setWalletAddress] = useState("");

//   useEffect(() => {
//     getCurrentWalletConnected();
//     addWalletListener();
//   }, [walletAddress]);

//   const connectWallet = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         /* MetaMask is installed */
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       /* MetaMask is not installed */
//       console.log("Please install MetaMask");
//     }
//   };

//   const getCurrentWalletConnected = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           console.log(accounts[0]);
//         } else {
//           console.log("Connect to MetaMask using the Connect button");
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       /* MetaMask is not installed */
//       console.log("Please install MetaMask");
//     }
//   };

//   const addWalletListener = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       });
//     } else {
//       /* MetaMask is not installed */
//       setWalletAddress("");
//       console.log("Please install MetaMask");
//     }
//   };