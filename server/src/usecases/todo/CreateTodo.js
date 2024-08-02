const TodoRepository = require('../../infrastructure/data/TodoRepository');
const { todoSchema } = require('../../entities/ValidationSchema');

class CreateTodo {
  async execute(todoData) {
    console.log('kkk')

    const { error, value } = todoSchema.validate(todoData);
    console.log(value)

    if (error) {
      throw new Error('Validation error');
    }

    return TodoRepository.create(value);
  }
}

module.exports = new CreateTodo();
