const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(filter);
  const now = new Date();

  res.json({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    overdue: tasks.filter((t) => t.status !== "Completed" && new Date(t.dueDate) < now).length
  });
});

module.exports = router;
