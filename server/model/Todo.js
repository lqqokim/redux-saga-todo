const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = {
    Todo
}