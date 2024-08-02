const express = require('express');
const { createTodo,getTodos,getTodoById,updateTodo,deleteTodo,uploadCsv, upload ,downloadTodosCsv ,filterByStatus } = require('../controller/TodoController');
const router = express.Router();
const verifyToken = require('../middileware/Auth') // we can use auth middile for the autharized routes upto the use cases 


router.post('/todos', createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.put('/todos/:id',verifyToken, updateTodo);
router.delete('/todos/:id',verifyToken,deleteTodo)
router.post('/todos/upload',verifyToken, upload.single('file'), uploadCsv);
router.get('/download',verifyToken, downloadTodosCsv);
router.get('/filter',filterByStatus);



module.exports = router;