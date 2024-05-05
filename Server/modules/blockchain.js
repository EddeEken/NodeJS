const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

function CryptoBlockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  this.createBlock(1, "Genesis", "Genesis");
}

CryptoBlockchain.prototype.createBlock = function () {
  const previousBlock = this.getLastBlock();
  const previousHash = previousBlock ? previousBlock.hash : "Genesis";
  const nonce = this.proofOfWork(previousHash, this.pendingTransactions);
  const hash = this.hashBlock(previousHash, this.pendingTransactions, nonce);

  const block = {
    index: this.chain.length,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousHash: previousHash,
  };

  this.pendingTransactions = [];
  this.chain.push(block);

  return block;
};

CryptoBlockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

CryptoBlockchain.prototype.addTransaction = function (transaction) {
  this.pendingTransactions.push(transaction);
};

CryptoBlockchain.prototype.createTransaction = function (
  amount,
  sender,
  recipient
) {
  const transaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
    transactionId: uuidv4().split("-").join(""),
  };

  this.pendingTransactions.push(transaction);

  return transaction;
};

CryptoBlockchain.prototype.hashBlock = function (
  previousHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    previousHash + JSON.stringify(currentBlockData) + nonce.toString();
  const hash = sha256(dataAsString);
  return hash;
};

CryptoBlockchain.prototype.proofOfWork = function (
  previousHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousHash, currentBlockData, nonce);

  while (hash.substring(0, 4) !== "0000") {
    nonce++;
    hash = this.hashBlock(previousHash, currentBlockData, nonce);
  }

  return nonce;
};

CryptoBlockchain.prototype.isChainValid = function (chain) {
  let valid = true;
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];
    const blockHash = this.hashBlock(
      previousBlock.hash,
      { transactions: currentBlock.transactions, index: currentBlock.index },
      currentBlock.nonce
    );

    if (blockHash !== currentBlock.hash) {
      valid = false;
      console.log("Hash is not correct");
    }
    if (currentBlock.previousHash !== previousBlock.hash) {
      valid = false;
      console.log("Previous hash is not correct");
    }
  }

  const genesisBlock = chain[0];
  const correctNonce = genesisBlock.nonce === 1;
  const correctPreviousHash = genesisBlock.previousHash === "Genesis";
  const correctHash = genesisBlock.hash === "Genesis";
  const correctTransactions = genesisBlock.transactions.length === 0;

  if (
    !correctNonce ||
    !correctPreviousHash ||
    !correctHash ||
    !correctTransactions
  ) {
    console.log("Genesis block is not correct");
    valid = false;
  }

  return valid;
};

module.exports = CryptoBlockchain;
