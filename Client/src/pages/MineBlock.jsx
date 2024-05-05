import { useState } from "react";
import axios from "axios";

const MineBlock = () => {
    const [transactionData, setTransactionData] = useState("");

const handleMine = () => {
    axios
      .post("http://localhost:3000/api/v1/bc/mine", { data: transactionData })
      .then((response) => {
        console.log("Transaction added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        console.error(error);
      });
    };


      return (
        <div>
        <h2>Solidifiera transaktion</h2>
          <button id="mine-btn" onClick={handleMine}>Utvinn block</button>
        </div>
      );
  };


  export default MineBlock;