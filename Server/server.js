const express = require("express");
const blockchainRoutes = require("./routers/blockchainRoutes");
const blockRoutes = require("./routers/blockRoutes");
const transactionRoutes = require("./routers/transactionRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/bc", blockchainRoutes);
app.use("/api/v1/block", blockRoutes);
app.use("/api/v1/transaction", transactionRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
