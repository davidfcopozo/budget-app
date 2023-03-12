const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());

//Routes
const budgetRouter = require("./routes/budgets");
const expenseRouter = require("./routes/expenses");

//middlewares
const authJWT = require("./middlewares/authJWT");

app.get("/api", (req, res) => {
  res.send("Budget Buddy API");
});

app.use("/api/budgets", authJWT, budgetRouter);
app.use("/api/expenses", authJWT, expenseRouter);
app.use(
  cors({
    origin: ["https://budget-buddy-d0db6.web.app/", "http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

const start = async () => {
  await connectDb(uri);
  app.listen(port, (req, res) => {});
};

start();
