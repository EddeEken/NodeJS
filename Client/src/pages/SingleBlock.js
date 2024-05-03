import { useState } from "react";
import axios from "axios";

const SingleBlock = () => {
    const [blockId, setBlockId] = useState("");
    const [blockData, setBlockData] = useState("");

    const handleInputChange = (event) => {
        setBlockId(event.target.value);
    };

    const handleClick = () => {
        axios
            .get(`/blocks/${blockId}`)
            .then((response) => {
                setBlockData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching block:", error);
            });
    };

    return (
        <div>
            <h2>Hämta ett specifikt block</h2>
            <input type="text" value={blockId} onChange={handleInputChange} />
            <button onClick={handleClick}>Hämta block</button>
            {blockData && <p>Block data: {blockData}</p>}
        </div>
    );
};

export default SingleBlock;
