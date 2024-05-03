const { blockchain } = require("../config/config");

exports.addBlock = (req, res) => {
  const newBlock = blockchain.createNewBlock(req.body.data);
  if (newBlock) {
    res.status(201).json({
      message: "Block added successfully",
      block: newBlock,
    });
  } else {
    res.status(400).json({
      message: "Block not added",
    });
  }
};
