const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());

let acceptedOrigins = [
  "https://budget-buddy-d0db6.web.app",
  "https://testing.dais1gsda79no.amplifyapp.com",
  /* "http://localhost:3000/", */
];

app.options("*", cors(acceptedOrigins));
app.use(cors(acceptedOrigins));

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

const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

const start = async () => {
  connectDb(uri);
  app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
  });
};

start();
