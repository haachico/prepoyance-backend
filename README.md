# Task Management Backend

Express server for the task management app. Built with Node.js and MySQL.

## What's Working

- Create, read, update, delete tasks (all CRUD operations)
- Search by title
- Filter by status and priority
- Pagination (can set page and limit)
- Validation for all inputs
- Error handling with proper status codes
- Uses parameterized queries to prevent SQL injection

## Setup

### Requirements

- Node.js v14+
- MySQL 5.7+

### Install & Run

```bash
npm install
```

Create the database and tables:

```sql
CREATE DATABASE task_management;
USE task_management;
```

Then run the schema file to create the table:

```bash
mysql -u root -p task_management < database/schema.sql
```

Create `.env` file with your database credentials:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=task_management
PORT=8000
```

Start the server:

```bash
npm run dev
```

Server runs on http://localhost:8000

## API Endpoints

### GET /api/tasks

Get all tasks with pagination, search, and filters.

Query params:

- `page` - page number (default 1)
- `limit` - tasks per page (default 10)
- `title` - search by title
- `status` - filter by Pending, In Progress, or Completed
- `priority` - filter by Low, Medium, or High

Example: `GET /api/tasks?page=1&limit=5&title=project`

### GET /api/tasks/:id

Get a single task by ID.

### POST /api/tasks

Create a new task.

Body:

```json
{
  "title": "Task name",
  "description": "What needs to be done",
  "status": "Pending",
  "priority": "Medium",
  "dueDate": "2026-07-25"
}
```

Validation:

- title: required, 3-150 chars
- description: required
- status: Pending, In Progress, or Completed
- priority: Low, Medium, or High
- dueDate: can't be in the past

### PUT /api/tasks/:id

Update a task. Send only the fields you want to change.

### DELETE /api/tasks/:id

Delete a task.

## Validation & Errors

When validation fails, you get a 400 response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Title must be between 3 and 150 characters"]
}
```

All errors return with proper HTTP status codes (400 for validation, 404 for not found, 500 for server errors).

## Folder Structure

```
src/
├── index.js - Express server
├── config/
│   └── db.js - MySQL connection pool
├── routes/
│   └── tasksRoutes.js - API routes
├── controllers/
│   └── taskController.js - Request handlers
├── services/
│   └── taskService.js - Database queries and logic
└── middleware/
    └── validation.js - Input validation

database/
└── schema.sql - Table definition
```

## Notes

- All queries use parameterized statements to prevent SQL injection
- Tasks are sorted by creation date (newest first)
- Pagination works with page and limit parameters
- Can combine search + filters in one request
- Update endpoint is working but frontend wiring is incomplete
