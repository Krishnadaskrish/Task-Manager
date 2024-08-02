const Todo = require('../../entities/Todo');

class TodoRepository {
  async create(todoData) {
    const todo = new Todo(todoData);
    return todo.save();
  }

  async findAll() {
    return Todo.find();
  }

  async findById(id) {
    return Todo.findById(id);
  }

  async updateById(id, updateData) {
    return Todo.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id) {
    return Todo.findByIdAndDelete(id);
  }

  async createMany(todoDataList) {
    return Todo.insertMany(todoDataList);
  }
}

module.exports = new TodoRepository();
