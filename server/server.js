const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Routes
const budgetRouter = require("./routes/budgets");
const expenseRouter = require("./routes/expenses");
const authRouter = require("./routes/auth");

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api/budgets", budgetRouter);
app.use("/api/expenses", expenseRouter);
app.use("/", authRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
