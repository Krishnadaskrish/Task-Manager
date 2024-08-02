const TodoRepository = require('../../infrastructure/data/TodoRepository');

class GetTodos {
  async execute() {
    return TodoRepository.findAll();
  }
}

module.exports = new GetTodos();
