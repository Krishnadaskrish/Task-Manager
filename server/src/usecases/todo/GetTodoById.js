const TodoRepository = require('../../infrastructure/data/TodoRepository');

class GetTodoById {
  async execute(id) {
    return TodoRepository.findById(id);
  }
}

module.exports = new GetTodoById();
