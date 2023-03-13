const { StatusCodes } = require("http-status-codes");
const Budget = require("../models/Budget");

const getAllBudgets = async (req, res) => {
  const uid = await req.headers.uid;
  const budgets = await Budget.find({
    createdBy: uid,
  });
  if (!budgets) {
    throw new Error(
      "There are no budgets, please create a new one and come back"
    );
  }
  res.status(StatusCodes.OK).json({ budgets });
};

const createBudget = async (req, res) => {
  const {
    body: { name, maxExpending },
  } = req;

  if (name === "" || maxExpending === "") {
    throw new Error(
      "Name and maximun expending amount are required for this request"
    );
  }
  if (maxExpending <= 0) {
    throw new Error("The maximun expending amount must be greater than zero");
  }

  const budget = await Budget.create(req.body);

  res.status(StatusCodes.CREATED).json({ budget });
};

const updateBudget = async (req, res) => {
  const {
    body: { name, maxExpending, createdBy: currentUser },
    params: { id: budgetId },
  } = req;

  if (name === "" || maxExpending === "") {
    throw new Error("Name and maximun expending are required");
  }
  if (maxExpending <= 0) {
    throw new Error("Maximun expending must be greater than 0");
  }
  const budget = await Budget.findOneAndUpdate(
    { _id: budgetId, createdBy: currentUser },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ budget });
};

const deleteBudget = async (req, res) => {
  const uid = await req.headers.uid;
  const {
    params: { id: budgetId },
  } = req;
  const budget = await Budget.findOneAndDelete({
    _id: budgetId,
    createdBy: uid,
  });

  if (!budget) {
    throw new Error(`No budget found with id: ${budgetId}`);
  }

  res.status(StatusCodes.OK).send("Budget successfully deleted");
};

module.exports = { createBudget, updateBudget, getAllBudgets, deleteBudget };
