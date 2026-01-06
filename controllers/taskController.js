import Task from '../models/Task.js';

// Get all tasks for user (sorted by deadline ascending)
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId })
            .sort({ deadline: 1 }) // 1 for ascending order
            .lean();

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tasks'
        });
    }
};

// Create new task
export const createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        // Validation
        if (!title || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Title and deadline are required'
            });
        }

        // Validate deadline is a valid date
        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid deadline date'
            });
        }

        // Create task
        const task = new Task({
            title,
            description: description || '',
            deadline: deadlineDate,
            userId: req.userId
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully!',
            task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create task'
        });
    }
};

// Update task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, completed } = req.body;

        // Find task
        const task = await Task.findOne({ _id: id, userId: req.userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Update fields
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (deadline !== undefined) {
            const deadlineDate = new Date(deadline);
            if (isNaN(deadlineDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid deadline date'
                });
            }
            task.deadline = deadlineDate;
        }
        if (completed !== undefined) task.completed = completed;

        await task.save();

        res.status(200).json({
            success: true,
            message: 'Task updated successfully!',
            task
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update task'
        });
    }
};

// Delete task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete task
        const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully!'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete task'
        });
    }
};

// Toggle task completion
export const toggleComplete = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task
        const task = await Task.findOne({ _id: id, userId: req.userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Toggle completed status
        task.completed = !task.completed;
        await task.save();

        res.status(200).json({
            success: true,
            message: `Task marked as ${task.completed ? 'completed' : 'incomplete'}!`,
            task
        });
    } catch (error) {
        console.error('Toggle complete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update task status'
        });
    }
};
