const asyncHandler = require("express-async-handler");
// @desc Set goal
// @route POST api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("no text field");
  }
  res.status(200).json({ message: "create request" });
});

// @desc Get goals
// @route GET api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "read request" });
});

// @desc Update goal
// @route PUT api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update id=${req.params.id} request` });
});

// @desc Delete goal
// @route DELETE api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete id=${req.params.id} request` });
});

module.exports = {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
