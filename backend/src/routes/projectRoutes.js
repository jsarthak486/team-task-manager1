const express = require("express");
const Project = require("../models/Project");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, members } = req.body;
    if (!title || !description) return res.status(400).json({ message: "Title and description are required" });

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members: members || []
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  const filter = req.user.role === "Admin" ? {} : { members: req.user._id };
  const projects = await Project.find(filter).populate("createdBy", "name email").populate("members", "name email role");
  res.json(projects);
});

router.get("/:id", protect, async (req, res) => {
  const project = await Project.findById(req.params.id).populate("members", "name email role");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

router.put("/:id/members", protect, adminOnly, async (req, res) => {
  const { members } = req.body;
  const project = await Project.findByIdAndUpdate(req.params.id, { members }, { new: true }).populate("members", "name email role");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;
