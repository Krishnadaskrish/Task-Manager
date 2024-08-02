const TodoRepository = require('../../infrastructure/data/TodoRepository');
const { Parser } = require('json2csv');

class DownloadTodosCsv {
  async execute() {
    const todos = await TodoRepository.findAll();
    const fields = ['title', 'description', 'status'];
    const parser = new Parser({ fields });
    return parser.parse(todos);
  }
}

module.exports = new DownloadTodosCsv();
