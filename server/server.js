const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: ["https://budget-buddy-backend.onrender.com"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

//Routes
const budgetRouter = require("./routes/budgets");
const expenseRouter = require("./routes/expenses");

//middlewares
const authJWT = require("./middlewares/authJWT");

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api/budgets", authJWT, budgetRouter);
app.use("/api/expenses", authJWT, expenseRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
