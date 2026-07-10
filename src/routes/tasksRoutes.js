const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  getTaskById,
} = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middleware/validation");

const router = express.Router();

router.post("/tasks", validateCreateTask, createTask);
router.put("/tasks/:id", validateUpdateTask, updateTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

module.exports = router;
