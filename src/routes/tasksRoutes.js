const express = require("express");
const { getAllTasks, createTask } = require("../controllers/taskController");
const { validateCreateTask } = require("../middleware/validation");

const router = express.Router();

router.post("/tasks", validateCreateTask, createTask);
router.get("/tasks", getAllTasks);
module.exports = router;
