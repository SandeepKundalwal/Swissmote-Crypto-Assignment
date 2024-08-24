
import React from 'react';
import { useWallet } from './WalletContext';
import { useEffect, useState } from 'react';

const GameScreen = () => {
    const { account } = useWallet();
    const [balance, setBalance] = useState(0);
    const [betAmount, setBetAmount] = useState('');
    const [outcome, setOutcome] = useState('heads');
    const [result, setResult] = useState('');

    console.log(account);

    // useEffect(() => {
    //     const fetchBalance = async () => {
    //       if (account && window.ethereum) {
    //         const fetchedBalance = await window.ethereum.request({
    //           method: 'eth_getBalance',
    //           params: [account, 'latest']
    //         });
    //         setBalance(window.web3.utils.fromWei(fetchedBalance, 'ether'));
    //       }
    //     };
    
    //     fetchBalance();
    // }, [account]);

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div id="navbarMenu" className="navbar-menu">
                        <div className="navbar-end is-align-items-center">
                            <button
                                className="button is-white connect-wallet"
                            >
                            <span className="is-link has-text-weight-bold">
                                {account}
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="hero is-fullheight">
                <div className="faucet-hero-body">
                <div className="container has-text-centered main-content">
                    <h1 className="title is-1">Flip Game</h1>
                    <p>Click on Flip Button, to test you luck. If you win, your ETH doubles.</p>
                    <div className="box address-box">
                    <div className="columns">
                        <div className="column is-four-fifths">
                            <input
                                className="input is-medium"
                                type="number"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                placeholder="Bet amount"
                            />
                        </div>
                        <div className="column">
                            <select className="button is-link is-medium" onChange={(e) => setOutcome(e.target.value)} value={outcome}>
                                <option value="heads">Heads</option>
                                <option value="tails">Tails</option>
                            </select>
                        </div>
                    </div>
                    <article className="panel is-grey-darker">
                        <p className="panel-heading">Flip Coin</p>
                        <div className="panel-block">
                            {result && <p>{result}</p>}
                        </div>
                    </article>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

export default GameScreen;