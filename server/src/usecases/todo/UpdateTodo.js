const TodoRepository = require('../../infrastructure/data/TodoRepository');
const { todoSchema } = require('../../entities/ValidationSchema');

class UpdateTodo {
  async execute(id, todoData) {
    const { error, value } = todoSchema.validate(todoData);

    if (error) {
      throw new Error('Validation error');
    }

    return TodoRepository.updateById(id, value);
  }
}

module.exports = new UpdateTodo();
