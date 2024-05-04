import { useState } from "react";
import axios from "axios";

const SingleBlock = () => {
  const [blockId, setBlockId] = useState("");
  const [blockData, setBlockData] = useState("");

  const handleInputChange = (event) => {
    setBlockId(event.target.value);
  };

  const handleClick = () => {
    // Convert blockId to a number since block indexes are usually numbers
    const blockIndex = parseInt(blockId);

    axios
      .get("/api/v1/bc")
      .then((response) => {
        console.log("Blockchain fetched:", response.data.blockchain.chain[0]);
        if (response.data.blockchain.chain) {
          const block = response.data.blockchain.chain.find(
            (block) => block.index === blockIndex
          );

          if (block) {
            setBlockData(block);
          } else {
            console.error(`Block with index ${blockIndex} not found.`);
          }
        } else {
          console.error("Invalid response data structure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching blockchain:", error);
      });
  };

  return (
    <div>
      <h2>Hämta ett specifikt block</h2>
      <input type="text" value={blockId} onChange={handleInputChange} />
      <button onClick={handleClick}>Hämta block</button>
      {blockData && <p>Block data: {JSON.stringify(blockData)}</p>}
    </div>
  );
};

export default SingleBlock;
