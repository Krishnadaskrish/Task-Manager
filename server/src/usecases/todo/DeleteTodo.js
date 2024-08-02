const TodoRepository = require('../../infrastructure/data/TodoRepository');

class DeleteTodo {
  async execute(id) {
    return TodoRepository.deleteById(id);
  }
}

module.exports = new DeleteTodo();
