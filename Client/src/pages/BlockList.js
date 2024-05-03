import { useState, useEffect } from "react";
import axios from "axios";

const BlockList = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        axios
            .get("/blocks")
            .then((response) => {
                setBlocks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching blocks:", error);
            });
    }, []);

    return (
        <div>
            <h2>Blockkedjans block</h2>
            <ul>
                {blocks.map((block) => (
                    <li key={block.id}>
                        Block ID: {block.id}, Data: {block.data}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlockList;
