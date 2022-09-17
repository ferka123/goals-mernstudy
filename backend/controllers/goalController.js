const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc Set goal
// @route POST api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("no text field");
  }
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc Get goals
// @route GET api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Update goal
// @route PUT api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(400);
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(400);
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  goal.deleteOne({ _id: req.user.id });
  res.status(200).json({ id: req.user.id });
});

module.exports = {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
