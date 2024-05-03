const express = require("express");
const router = express.Router();

const { addBlock } = require("../controllers/blockController");

router.route("/add").post(addBlock);

module.exports = router;
