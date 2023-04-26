const express = require("express");
const {
  createBudget,
  updateBudget,
  getAllBudgets,
  deleteBudget,
} = require("../controllers/budget");
const router = express.Router();

router.route("/").post(createBudget).get(getAllBudgets);
router.route("/:id").patch(updateBudget).delete(deleteBudget);

module.exports = router;
