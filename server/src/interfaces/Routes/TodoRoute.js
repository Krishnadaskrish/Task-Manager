
const express = require('express');
const TodoController = require('../controller/TodoController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/todos', TodoController.createTodo);
router.get('/todos', TodoController.getTodos);
router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);
router.post('/todos/upload', upload.single('file'), TodoController.uploadCsv);
router.get('/download', TodoController.downloadTodosCsv);
router.get('/filter', TodoController.filterByStatus);

module.exports = router;




module.exports = router;