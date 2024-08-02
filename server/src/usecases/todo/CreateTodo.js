const TodoRepository = require('../../infrastructure/data/TodoRepository');
const { todoSchema } = require('../../entities/ValidationSchema');

class CreateTodo {
  async execute(todoData) {
    const { error, value } = todoSchema.validate(todoData);

    if (error) {
      throw new Error('Validation error');
    }

    return TodoRepository.create(value);
  }
}

module.exports = new CreateTodo();
