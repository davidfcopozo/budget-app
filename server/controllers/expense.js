const { StatusCodes } = require("http-status-codes");
const Expense = require("../models/Expense");

const getAllExpenses = async (req, res) => {
  const uid = await req.headers.uid;
  const expenses = await Expense.find({ createdBy: uid }).sort("createdAt");

  res.status(StatusCodes.OK).json({ expenses, count: expenses.length });
};

const createExpense = async (req, res) => {
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
  const {
    body: { description, amount, budgetId, createdBy },
    params: { id },
  } = req;

  if (budgetId === "") {
    throw new Error("Please select the the budget this expense belongs to");
  }

  if (description === "" && amount === "") {
    throw new Error("Please provide the data  to be updated");
  }

  if (amount <= 0 || amount === "") {
    throw new Error("The amount must be greater than 0");
  }

  const expense = await Expense.findByIdAndUpdate(
    { _id: id, createdBy: createdBy },
    req.body,
    { new: true, runValidators: true }
  );

  if (!expense) {
    throw new Error(`The expense with the id ${id} does not exist`);
  }

  res.status(StatusCodes.OK).json({ expense });
};

const deleteExpense = async (req, res) => {
  const uid = await req.headers.uid;
  const {
    params: { id: expenseId },
  } = req;

  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    createdBy: uid,
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
