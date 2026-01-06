import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster queries
taskSchema.index({ userId: 1, deadline: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
