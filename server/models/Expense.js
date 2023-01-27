const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    budgetCategory: {
      type: String,
      default: "uncategorized",
      maxlength: 50,
    },
    createdBy: {
      type: String,
      required: [true, "CreatedBy is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
