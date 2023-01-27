const { StatusCodes } = require("http-status-codes");
const Budget = require("../models/Budget");

const getAllBudgets = async (req, res) => {
  const budgets = await Budget.find({ createdBy: "user2" }).sort("createdAt");
  if (!budgets) {
    throw new Error(
      "There are no budgets, please create a new one and come back"
    );
  }
  res.status(StatusCodes.OK).json({ budgets });
};

const createBudget = async (req, res) => {
  /* const budget = await Budget.create(req.body);
  res.status(StatusCodes.CREATED).json({ budget }); */

  //Get current/signed in user from firebase
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
    //Get current/signed in user from firebase
    body: { name, maxExpending },
    params: { id: budgetId },
  } = req;

  if (name === "" || maxExpending === "") {
    throw new Error("Name and maximun expending are required");
  }
  if (maxExpending <= 0) {
    throw new Error("Maximun expending must be greater than 0");
  }
  const budget = await Budget.findOneAndUpdate(
    { _id: budgetId, createdBy: "user2" },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ budget });
};

const deleteBudget = async (req, res) => {
  const {
    //Get current/signed in user from firebase
    params: { id: budgetId },
  } = req;

  const budget = await Budget.findOneAndDelete(
    //Get current/signed in user from firebase
    { _id: budgetId, createdBy: "user2" }
  );

  if (!budget) {
    throw new Error(`No budget found with id: ${budgetId}`);
  }

  res.status(StatusCodes.OK).send("Budget successfully deleted");
};

module.exports = { createBudget, updateBudget, getAllBudgets, deleteBudget };
