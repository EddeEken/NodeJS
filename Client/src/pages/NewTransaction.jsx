import { useState } from "react";
import axios from "axios";

const NewTransaction = () => {
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [addedTransaction, setAddedTransaction] = useState(null);

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value;
    if (
      inputAmount === "" ||
      (!isNaN(inputAmount) && parseFloat(inputAmount) >= 1)
    ) {
      setAmount(inputAmount);
    }
  };

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubmit = async () => {
    const transactionData = {
      amount: amount,
      sender: sender,
      recipient: recipient,
    };

    try {
      const response = await axios.post(
        "/api/v1/transaction/add",
        transactionData
      );
      if (response.data.message === "Transaction added successfully") {
        setAddedTransaction(response.data.transaction);
        console.log("Transaction added:", response.data.transaction);
      } else {
        console.log("Transaction not added:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error adding transaction:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error adding transaction:", error.message);
      }
    }
  };

  return (
    <div>
      <h2>Add new transaction</h2>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input className="input-transaction"
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label htmlFor="sender">Sender: </label>
        <input className="input-transaction"
          type="text"
          id="sender"
          value={sender}
          onChange={handleSenderChange}
        />
      </div>
      <div>
        <label htmlFor="recipient">Recipient: </label>
        <input className="input-transaction" 
          type="text"
          id="recipient"
          value={recipient}
          onChange={handleRecipientChange}
        />
      </div>
      <button id="add-btn" onClick={handleSubmit}>Add transaction</button>
      {addedTransaction && (
        <div>
          <h3>Added Transaction:</h3>
          <p>Amount: {addedTransaction.amount}</p>
          <p>Sender: {addedTransaction.sender}</p>
          <p>Recipient: {addedTransaction.recipient}</p>
          <p>Transaction ID: {addedTransaction.transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default NewTransaction;
