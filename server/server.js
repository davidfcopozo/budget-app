const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
const budgetRouter = require("./routes/budgets");
const expenseRouter = require("./routes/expenses");

//middlewares
const authJWT = require("./middlewares/authJWT");

app.options("*", cors());
app.get("/api", (req, res) => {
  res.send("Budget Buddy API");
});

app.use("/api/budgets", authJWT, budgetRouter);
app.use("/api/expenses", authJWT, expenseRouter);

const corsOptions = {
  origin: "https://budget-buddy-d0db6.web.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

const start = async () => {
  await connectDb(uri);
  app.listen(port, (req, res) => {
    console.log(`Listeting on ${port}`);
  });
};

start();
