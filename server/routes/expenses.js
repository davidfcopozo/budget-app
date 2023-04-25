const express = require("express");
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense");

router.route("/").get(getAllExpenses).post(createExpense);
router.route("/:id").patch(updateExpense).delete(deleteExpense);

module.exports = router;
