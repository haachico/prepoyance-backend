const { handleGetTasks, handleCreateTask } = require("../services/taskService");

const createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const result = await handleCreateTask(taskData);
    res.status(201).json(result);
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

module.exports = {
  createTask,
  getAllTasks,
};
