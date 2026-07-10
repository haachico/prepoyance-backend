const validateCreateTask = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  } else if (title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  } else if (title.trim().length > 150) {
    errors.push("Title must not exceed 150 characters");
  }

  if (!description || description.trim() === "") {
    errors.push("Description is required");
  }

  if (status && !["Pending", "In Progress", "Completed"].includes(status)) {
    errors.push("Status must be one of: Pending, In Progress, Completed");
  }

  if (priority && !["Low", "Medium", "High"].includes(priority)) {
    errors.push("Priority must be one of: Low, Medium, High");
  }

  if (dueDate) {
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push("Due date cannot be in the past");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  const errors = [];

  if (title !== undefined) {
    if (title.trim() === "") {
      errors.push("Title is required");
    } else if (title.trim().length < 3) {
      errors.push("Title must be at least 3 characters");
    } else if (title.trim().length > 150) {
      errors.push("Title must not exceed 150 characters");
    }
  }

  if (description !== undefined) {
    if (description.trim() === "") {
      errors.push("Description is required");
    }
  }

  if (status && !["Pending", "In Progress", "Completed"].includes(status)) {
    errors.push("Status must be one of: Pending, In Progress, Completed");
  }

  if (priority && !["Low", "Medium", "High"].includes(priority)) {
    errors.push("Priority must be one of: Low, Medium, High");
  }

  if (dueDate) {
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push("Due date cannot be in the past");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
