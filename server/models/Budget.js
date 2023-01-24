const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the budget"],
      maxlength: 100,
    },
    maxExpending: {
      type: Number,
      required: [true, "Please provide the maximun expending amount"],
    },
    createdBy: {
      type: String,
      default: "uncategorized",
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);
