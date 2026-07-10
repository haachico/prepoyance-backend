const {
  handleGetTasks,
  handleCreateTask,
  handleUpdateTask,
  handleGetTaskById,
} = require("../services/taskService");

const createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const result = await handleCreateTask(taskData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const result = await handleUpdateTask(taskId, taskData);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await handleGetTasks(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    if (!taskId || parseInt(taskId) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const result = await handleGetTaskById(taskId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  getTaskById,
};
