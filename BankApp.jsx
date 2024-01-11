import React, { useState } from 'react';
import './App.css';

const BankApp = () => {
  const [accounts, setAccounts] = useState({
    "123456": 1000,
    "789012": 500
  });
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const createAccount = (accountNumber, initialBalance) => {
    if (!accounts[accountNumber]) {
      setAccounts({
        ...accounts,
        [accountNumber]: initialBalance
      });
      setMessage(`Account ${accountNumber} created with an initial balance of ${initialBalance}.`);
    } else {
      setMessage(`Account ${accountNumber} already exists.`);
    }
  };

  const checkBalance = (accountNumber) => {
    const balance = accounts[accountNumber];
    if (balance !== undefined) {
      setMessage(`Balance in account ${accountNumber}: ${balance}`);
    } else {
      setMessage(`Account ${accountNumber} does not exist.`);
    }
  };

  const transferFunds = () => {
    if (accounts[fromAccount] && accounts[toAccount]) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue) && accounts[fromAccount] >= amountValue) {
        setAccounts({
          ...accounts,
          [fromAccount]: accounts[fromAccount] - amountValue,
          [toAccount]: accounts[toAccount] + amountValue
        });
        setMessage(`Transfer of ${amountValue} from account ${fromAccount} to account ${toAccount} successful.`);
      } else {
        setMessage("Invalid amount or insufficient funds.");
      }
    } else {
      setMessage("Invalid account numbers.");
    }
  };

  return (
    <div className="App">
      <h1>Simple Bank App</h1>
      <div>
        <button onClick={() => createAccount("123456", 1000)}>Create Account 123456</button>
        <button onClick={() => createAccount("789012", 500)}>Create Account 789012</button>
      </div>
      <div>
        <button onClick={() => checkBalance("123456")}>Check Balance for Account 123456</button>
        <button onClick={() => checkBalance("789012")}>Check Balance for Account 789012</button>
      </div>
      <div>
        <input type="text" placeholder="From Account" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} />
        <input type="text" placeholder="To Account" value={toAccount} onChange={(e) => setToAccount(e.target.value)} />
        <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={transferFunds}>Transfer Funds</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default BankApp;
