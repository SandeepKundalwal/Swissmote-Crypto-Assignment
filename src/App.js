import './App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './Components/WalletContext';

function App() {
  const navigate = useNavigate();
  const { setAccount } = useWallet();

  const connectWallet = async() => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        setAccount(account);
        // console.log(account);
        navigate('/game-screen');
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  }

  return (
    <div>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <button className="button is-red" onClick={connectWallet}>
              Connect Wallet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
