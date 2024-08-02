const TodoRepository = require('../../infrastructure/data/TodoRepository');

class FilterByStatus {
  async execute(status) {
    if (status === 'all') {
      return TodoRepository.findAll();
    } else {
      return TodoRepository.find({ status });
    }
  }
}

module.exports = new FilterByStatus();
