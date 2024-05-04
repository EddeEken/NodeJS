import React, { useState, useEffect } from "react";
import axios from "axios";

const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/bc")
      .then((response) => {
        setBlocks(response.data.blockchain.chain);
        console.log("Blocks fetched:", response.data.blockchain.chain);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blocks:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Blockkedjans block</h2>
      <ul>
        {blocks.map((block, index) => (
          <li key={index}>
            {" "}
            {/* Use index as key */}
            Block Index: {block.index}, Timestamp: {block.timestamp}{" "}
            Transactions: {block.transactions.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockList;
