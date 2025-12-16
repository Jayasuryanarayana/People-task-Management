const Task = require('../models/Task');

// Get All Tasks 
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

//  Create a Task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const newTask = new Task({
            title,
            description,
            user: req.user.id 
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Update a Task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        
        let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

//Delete a Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};