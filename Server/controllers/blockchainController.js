const { blockchain } = require("../config/config");

exports.getBlockchain = (req, res) => {
  res.status(200).json({
    message: "Blockchain fetched successfully",
    blockchain: blockchain,
  });
};

exports.mineBlock = (req, res) => {
  const newBlock = blockchain.createBlock(req.body.data);
  if (newBlock) {
    res.status(201).json({
      message: "Block mined successfully",
      block: newBlock,
    });
  } else {
    res.status(400).json({
      message: "Block not mined",
    });
  }
};
