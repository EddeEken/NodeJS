const { blockchain } = require("../config/config");
//const axios = require("axios");

exports.addTransaction = (req, res) => {
  const newTransaction = blockchain.createTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  if (newTransaction) {
    res.status(201).json({
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } else {
    res.status(400).json({
      message: "Transaction not added",
    });
  }
};
