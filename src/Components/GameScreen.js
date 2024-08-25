import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './WalletContext';

const GameScreen = () => {
    const { account } = useWallet();
    const [balance, setBalance] = useState(0);
    const [betAmount, setBetAmount] = useState('');
    const [outcome, setOutcome] = useState('heads');
    const [result, setResult] = useState('');
    const [isWin, setIsWin] = useState(true); // to track if the user  won or not
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            if (account && window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const fetchedBalance = await provider.getBalance(account);
                setBalance(ethers.utils.formatEther(fetchedBalance));
            }
        };
        fetchBalance();
    }, [account]);

    const handleFlipCoin = async () => {
        if (betAmount.length === 0) {
            setErrorMessage('Please enter bet amount.');
            return;
        }

        const betAmountInEther = parseFloat(betAmount);

        if (betAmountInEther > parseFloat(balance)) {
            setErrorMessage('Bet amount exceeds your current ETH balance!');
            return;
        }

        setErrorMessage('');

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
            const userWon = flipResult === outcome;

            if (userWon) {
                const transactionResponse = await signer.sendTransaction({
                    to: account,
                    value: ethers.utils.parseEther((betAmountInEther * 2).toString())
                });
                await transactionResponse.wait();

                setIsWin(true);
                setResult(`You won! It was ${flipResult}.`);
            } else {
                const transactionResponse = await signer.sendTransaction({
                    to: "0xYourContractOrOwnerAddressHere",
                    value: ethers.utils.parseEther(betAmountInEther.toString())
                });
                await transactionResponse.wait();

                setIsWin(false);
                setResult(`You lost! It was ${flipResult}.`);
            }

            const updatedBalance = await provider.getBalance(account);
            setBalance(ethers.utils.formatEther(updatedBalance));

        } catch (error) {
            console.error('Transaction error:', error);
            setErrorMessage('Transaction failed. Please try again.');
        }
    };

    return (
        <div>
            <style>
                {`
                    .hover-effect {
                        cursor: pointer;
                        transition: color 0.3s ease, opacity 0.3s ease;
                    }
                    .hover-effect:hover {
                        color: #9e9e9e;
                        opacity: 0.7;
                    }
                    .result {
                        font-size: 2rem;
                        font-weight: bold;
                        padding: 10px;
                        border: 2px solid;
                        border-radius: 8px;
                        background-color: #f0f4f8;
                        margin-top: 20px;
                        text-align: center;
                        display: inline-block;
                    }
                    .result.win {
                        color: #4caf50; /* Green for win */
                        border-color: #4caf50;
                    }
                    .result.lose {
                        color: #f44336; /* Red for loss */
                        border-color: #f44336;
                    }
                    .center-block {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>

            <nav className="navbar">
                <div className="container">
                    <div id="navbarMenu" className="navbar-menu">
                        <div className="navbar-end is-align-items-center">
                            <button className="button is-white connect-wallet">
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
                        <p>Click on Flip Button, to test your luck. If you win, your ETH doubles.</p>

                        <div className="box eth-balance-box">
                            <p className="has-text-weight-bold is-size-4">Current ETH Balance:</p>
                            <p className="has-text-weight-bold is-size-2">{balance ? `${balance} ETH` : 'Loading...'}</p>
                        </div>

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
                                    <select className="select is-link is-medium" onChange={(e) => setOutcome(e.target.value)} value={outcome}>
                                        <option value="heads">Heads</option>
                                        <option value="tails">Tails</option>
                                    </select>
                                </div>
                            </div>
                            <article className="panel is-grey-darker">
                                <p className="panel-heading hover-effect" onClick={handleFlipCoin}>
                                    Flip Coin
                                </p>

                                {errorMessage && (
                                    <p className="has-text-danger has-text-weight-bold">{errorMessage}</p>
                                )}

                                {result && (
                                    <div className="panel-block center-block">
                                        <p className={`result ${isWin ? 'win' : 'lose'}`}>{result}</p>
                                    </div>
                                )}
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default GameScreen;
