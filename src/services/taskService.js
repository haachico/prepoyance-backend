const pool = require("../config/db");

const handleCreateTask = async (taskData) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const { title, description, status, priority, dueDate } = taskData;

    const [result] = await connection.query(
      `insert into tasks (title, description, status, priority, due_date) values (?, ? , ?, ?, ?)`,
      [title, description, status, priority, dueDate],
    );

    return {
      success: true,
      message: "Task created successfully",
      data: {
        id: result.insertId,
        title,
        description,
        status,
        priority,
        dueDate,
      },
    };
  } finally {
    if (connection) connection.release();
  }
};

const handleUpdateTask = async (taskId, taskData) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const { title, description, status, priority, dueDate } = taskData;

    const conditons = [];
    const values = [];

    if (title) {
      conditons.push("title = ?");
      values.push(title);
    }

    if (description) {
      conditons.push("description = ?");
      values.push(description);
    }
    if (status) {
      conditons.push("status = ?");
      values.push(status);
    }
    if (priority) {
      conditons.push("priority = ?");
      values.push(priority);
    }
    if (dueDate) {
      conditons.push("due_date = ?");
      values.push(dueDate);
    }

    if (conditons.length === 0) {
      return {
        success: false,
        message: "No fields to update",
      };
    }

    const [result] = await connection.query(
      `update tasks set ${conditons.join(", ")} where id = ?`,
      [...values, taskId],
    );

    return {
      success: true,
      message: "Task updated successfully",
      data: {
        id: taskId,
        title,
        description,
        status,
        priority,
        dueDate,
      },
    };
  } finally {
    if (connection) connection.release();
  }
};

const handleGetTasks = async (page, limit) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const offset = (page - 1) * limit;

    const [tasks] = await connection.query(
      `select * from tasks 
        limit ? offset ?`,
      [limit, offset],
    );

    const [countResult] = await connection.query(
      `select count(*) as total from tasks`,
    );

    const total = countResult[0].total;

    return {
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } finally {
    if (connection) connection.release();
  }
};

const handleGetTaskById = async (taskId) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const [task] = await connection.query(`select * from tasks where id = ?`, [
      taskId,
    ]);

    return {
      success: true,
      message: "Task fetched successfully",
      data: task[0],
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  handleCreateTask,
  handleUpdateTask,
  handleGetTasks,
  handleGetTaskById,
};
