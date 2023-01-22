const { StatusCodes } = require("http-status-codes");
const Expense = require("../models/Expense");

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({ createdBy: "user1" }).sort("createdAt");

  res.status(StatusCodes.OK).json({ expenses, count: expenses.length });
};

const createExpense = async (req, res) => {
  //Get current/signed in user from firebase
  const {
    body: { description, amount },
  } = req;

  if (description === "" || amount === "") {
    throw new Error("Description and amount are required for this request");
  }
  if (amount <= 0) {
    throw new Error("The expense amount must be greater than zero");
  }

  const expense = await Expense.create(req.body);

  res.status(StatusCodes.CREATED).json({ expense });
};

const updateExpense = async (req, res) => {
  //Get current/signed in user from firebase
  const {
    body: { description, amount, budgetId: category },
    params: { id },
  } = req;

  if (description === "" && amount === "" && category === "") {
    throw new Error("Please provide the data  to be updated");
  }

  if (amount <= 0) {
    throw new Error("The amount must be greater than 0");
  }

  const expense = await Expense.findByIdAndUpdate(
    { _id: id, createdBy: "user1" },
    req.body,
    { new: true, runValidators: true }
  );

  if (!expense) {
    throw new Error(`The expense with the id ${id} does not exist`);
  }

  res.status(StatusCodes.OK).json({ expense });
};

const deleteExpense = async (req, res) => {
  const {
    params: { id: expenseId },
  } = req;

  const expense = await Expense.findByIdAndDelete({
    _id: expenseId,
    createdBy: "user1",
  });

  if (!expense) {
    throw new Error(`No expense found with id: ${expenseId}`);
  }

  res.status(StatusCodes.OK).send("Expense deleted successfully deleted");
};

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
