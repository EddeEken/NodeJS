import { useState } from "react";
import axios from "axios";

const NewTransaction = () => {
  const [transactionData, setTransactionData] = useState("");

  const handleInputChange = (event) => {
    setTransactionData(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("/api/v1/transaction/add", { data: transactionData })
      .then((response) => {
        console.log("Transaction added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  };

  return (
    <div>
      <h2>Lägg till en ny transaktion</h2>
      <input type="text" value={transactionData} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Lägg till</button>
    </div>
  );
};

export default NewTransaction;
