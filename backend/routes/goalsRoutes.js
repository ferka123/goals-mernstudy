const express = require("express");
const router = express.Router();
const {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").post(setGoal).get(getGoals);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
