const express = require("express");
const router = express.Router();

const {
  getBlockchain,
  mineBlock,
} = require("../controllers/blockchainController");

router.route("/").get(getBlockchain);
router.route("/mine").post(mineBlock);

module.exports = router;
