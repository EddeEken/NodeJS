import { useState } from "react";
import axios from "axios";

const SingleBlock = () => {
  const [blockId, setBlockId] = useState("");
  const [blockData, setBlockData] = useState(null);
  const [blockNotFound, setBlockNotFound] = useState(false);

  const handleInputChange = (event) => {
    setBlockId(event.target.value);
  };

  const handleClick = () => {
    const blockIndex = parseInt(blockId);

    axios
      .get("/api/v1/bc")
      .then((response) => {
        if (response.data.blockchain.chain) {
          const block = response.data.blockchain.chain.find(
            (block) => block.index === blockIndex
          );

          if (block) {
            setBlockData(block);
            setBlockNotFound(false);
          } else {
            console.error(`Block with index ${blockIndex} not found.`);
            setBlockData(null);
            setBlockNotFound(true);
          }
        } else {
          console.error("Invalid response data structure.");
          setBlockData(null);
          setBlockNotFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching blockchain:", error);
        setBlockData(null);
        setBlockNotFound(true);
      });
  };

  return (
    <div>
      <h2>Hitta ett specifikt block</h2>
      <input type="text" value={blockId} onChange={handleInputChange} />
      <button onClick={handleClick}>Sök block</button>
      {blockData && !blockNotFound && (
        <div>
          <h3>Block data:</h3>
          <p>Index: {blockData.index}</p>
          <p>Timestamp: {new Date(blockData.timestamp).toLocaleString()}</p>
          <p>Nonce: {blockData.nonce}</p>
          <p>Hash: {blockData.hash}</p>
          <p>Previous Hash: {blockData.previousHash}</p>
          <p>Transactions:</p>
          <ul>
            {blockData.transactions.map((transaction) => (
              <li key={transaction.transactionId}>
                <p>Transaction ID: {transaction.transactionId}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Sender: {transaction.sender}</p>
                <p>Recipient: {transaction.recipient}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {blockNotFound && <p>Block not found.</p>}{" "}
    </div>
  );
};

export default SingleBlock;
