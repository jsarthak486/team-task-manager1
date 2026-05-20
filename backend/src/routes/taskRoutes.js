const express = require("express");
const Task = require("../models/Task");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;
    if (!title || !description || !projectId || !assignedTo || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({ title, description, projectId, assignedTo, dueDate, createdBy: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(filter)
    .populate("projectId", "title")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ dueDate: 1 });
  res.json(tasks);
});

router.put("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "In Progress", "Completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.user.role !== "Admin" && task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  task.status = status;
  await task.save();
  res.json(task);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
