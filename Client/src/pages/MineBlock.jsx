import { useState } from "react";
import axios from "axios";

const MineBlock = () => {
  const [minedBlock, setMinedBlock] = useState(null);

  const mineBlock = () => {
    axios
      .post("/api/v1/bc/mine")
      .then((response) => {
        console.log("Block mined:", response.data.block);
        setMinedBlock(response.data.block); // Set the mined block in state
      })
      .catch((error) => {
        console.error("Error mining block:", error);
      });
  };

  return (
    <div>
      <h2>Solidifiera transaktion</h2>
      <button id="mine-btn" onClick={mineBlock}>
        Utvinn block
      </button>
      {minedBlock && ( // Render the mined block if it exists
        <div>
          <h3>Utvinnt block:</h3>
          <p>Index: {minedBlock.index}</p>
          <p>Timestamp: {minedBlock.timestamp}</p>
          <p>Nonce: {minedBlock.nonce}</p>
          <p>Hash: {minedBlock.hash}</p>
          <p>Previous Hash: {minedBlock.previousHash}</p>
          <p>Transactions: {minedBlock.transactions.length}</p>
        </div>
      )}
    </div>
  );
};

export default MineBlock;
