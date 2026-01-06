import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, toggleComplete } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected with authMiddleware
router.use(authMiddleware);

// GET /api/tasks - Get all tasks
router.get('/', getTasks);

// POST /api/tasks - Create new task
router.post('/', createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', deleteTask);

// PATCH /api/tasks/:id/toggle - Toggle completion status
router.patch('/:id/toggle', toggleComplete);

export default router;
