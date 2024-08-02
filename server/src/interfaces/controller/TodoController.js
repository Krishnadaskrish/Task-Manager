const CreateTodo = require('../../usecases/todo/CreateTodo');
const GetTodos = require('../../usecases/todo/GetTodos');
const GetTodoById = require('../../usecases/todo/GetTodoById');
const UpdateTodo = require('../../usecases/todo/UpdateTodo');
const DeleteTodo = require('../../usecases/todo/DeleteTodo');
const UploadCsv = require('../../usecases/todo/UploadCsv');
const DownloadTodosCsv = require('../../usecases/todo/DownloadTodosCsv');
const FilterByStatus = require('../../usecases/todo/FilterByStatus');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const createTodo = async (req, res) => {
  try {
    const savedTodo = await CreateTodo.execute(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Todo created successfully!',
      data: savedTodo,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await GetTodos.execute();
    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched todos',
      data: todos,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await GetTodoById.execute(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched todo',
      data: todo,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await UpdateTodo.execute(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully updated todo',
      data: updatedTodo,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const result = await DeleteTodo.execute(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  try {
    const data = await UploadCsv.execute(req.file.path);
    res.status(200).json({
      message: 'File uploaded and todos saved successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadTodosCsv = async (req, res) => {
  try {
    const csv = await DownloadTodosCsv.execute();
    res.header('Content-Type', 'text/csv');
    res.attachment('todos.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error generating CSV' });
  }
};

const filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await FilterByStatus.execute(status);
    res.status(200).json({
      status: 'success',
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  uploadCsv,
  downloadTodosCsv,
  filterByStatus,
  upload
};
