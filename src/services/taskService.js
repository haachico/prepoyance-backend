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

module.exports = {
  handleCreateTask,
  handleUpdateTask,
  handleGetTasks,
};
