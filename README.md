# Task Management Portal - Backend

Node.js + Express REST API for the Task Management Portal. Provides full CRUD operations with validation, filtering, searching, and pagination.

## Features Implemented ✅

- **Create Task** - POST /api/tasks with full validation
- **Read Tasks** - GET /api/tasks with pagination, search, and filtering
- **Read Task by ID** - GET /api/tasks/:id
- **Update Task** - PUT /api/tasks/:id (API endpoint ready, frontend wiring in progress)
- **Delete Task** - DELETE /api/tasks/:id
- **Search** - Search tasks by title
- **Filter by Status** - Filter tasks by Pending, In Progress, or Completed
- **Filter by Priority** - Filter tasks by Low, Medium, or High
- **Pagination** - Get tasks with page/limit parameters
- **Validation** - Input validation with meaningful error messages
- **Error Handling** - Consistent error response structure
- **Parameterized Queries** - SQL injection prevention

## Setup Instructions

### Prerequisites
- Node.js v14+ installed
- MySQL 5.7+ running
- MySQL user with database creation privileges

### Installation

```bash
npm install
```

### Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE task_management;
USE task_management;
```

2. Run schema file to create table:
```bash
mysql -u root -p task_management < database/schema.sql
```

Or manually execute SQL from `database/schema.sql`.

### Environment Configuration

Create `.env` file in backend root:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=task_management
PORT=8000
```

Update credentials to match your MySQL setup.

### Running the Server

```bash
npm run dev
```

Server will start on `http://localhost:8000`

## API Endpoints

### Get All Tasks
**Endpoint:** `GET /api/tasks`

**Query Parameters:**
- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 10) - Tasks per page
- `title` (optional) - Search tasks by title
- `status` (optional) - Filter by status (Pending, In Progress, Completed)
- `priority` (optional) - Filter by priority (Low, Medium, High)

**Example Request:**
```
GET /api/tasks?page=1&limit=5&title=project&status=Pending&priority=High
```

**Response:**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Project Setup",
      "description": "Initialize project",
      "status": "In Progress",
      "priority": "High",
      "due_date": "2026-07-20",
      "created_at": "2026-07-10T10:00:00.000Z",
      "updated_at": "2026-07-10T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 12,
    "totalPages": 3
  }
}
```

### Get Task by ID
**Endpoint:** `GET /api/tasks/:id`

**Example Request:**
```
GET /api/tasks/1
```

**Response:**
```json
{
  "success": true,
  "message": "Task fetched successfully",
  "data": {
    "id": 1,
    "title": "Project Setup",
    "description": "Initialize project",
    "status": "In Progress",
    "priority": "High",
    "due_date": "2026-07-20",
    "created_at": "2026-07-10T10:00:00.000Z",
    "updated_at": "2026-07-10T10:00:00.000Z"
  }
}
```

### Create Task
**Endpoint:** `POST /api/tasks`

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "Pending",
  "priority": "Medium",
  "dueDate": "2026-07-25"
}
```

**Validation Rules:**
- `title` - Required, 3-150 characters
- `description` - Required
- `status` - Required (Pending, In Progress, Completed)
- `priority` - Required (Low, Medium, High)
- `dueDate` - Optional, cannot be in the past

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 5,
    "title": "New Task",
    "description": "Task description",
    "status": "Pending",
    "priority": "Medium",
    "dueDate": "2026-07-25"
  }
}
```

**Response (Validation Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required",
    "Title must be between 3 and 150 characters"
  ]
}
```

### Update Task
**Endpoint:** `PUT /api/tasks/:id`

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-07-30"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2026-07-30"
  }
}
```

### Delete Task
**Endpoint:** `DELETE /api/tasks/:id`

**Example Request:**
```
DELETE /api/tasks/1
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── index.js (Express server setup, CORS, middleware)
│   ├── config/
│   │   └── db.js (MySQL connection pool)
│   ├── routes/
│   │   └── tasksRoutes.js (API endpoints)
│   ├── controllers/
│   │   └── taskController.js (Request handlers)
│   ├── services/
│   │   └── taskService.js (Business logic & DB queries)
│   └── middleware/
│       └── validation.js (Input validation)
├── database/
│   └── schema.sql (Database table definition)
├── .env (Environment variables)
└── package.json
```

## Technologies

- Node.js
- Express.js
- MySQL (mysql2/promise)
- dotenv (environment variables)

## Error Responses

All errors follow consistent format:

**400 Bad Request** - Validation errors
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["error message"]
}
```

**404 Not Found** - Resource not found
```json
{
  "success": false,
  "message": "Task not found"
}
```

**500 Internal Server Error** - Server errors
```json
{
  "success": false,
  "message": "Internal server error"
}
```
