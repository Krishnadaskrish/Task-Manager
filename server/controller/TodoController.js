const Todo = require("../models/Todo");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const { Parser } = require('json2csv');
const {todoSchema} = require('../models/ValidationSchema')


const upload = multer({ dest: "uploads/" });

const createTodo = async (req, res) => {
  try {
    const { error, value } = todoSchema.validate(req.body);

    if (error) {
      console.error(error.details);
      return res.status(400).send({ message: 'Validation error', errors: error.details });
    }

    const { title, description, status } = value;

    const newTodo = new Todo({
      title,
      description,
      status,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json({
      status: "success",
      message: "Todo created successfully!",
      data: savedTodo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetched todo",
        data: todos,
      });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getTodoById = async (req,res) => {
  try {
    const id = req.params;
    const todo = await Todo.findById(id);
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetched todo",
        data: todo,
      });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const updateTodo = async (req, res) => {
  console.log("kkkkk");
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    await updatedTodo.save();

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(201)
      .json({
        status: "success",
        message: "successfully updated todo",
        updatedTodo,
      });
  } catch (err) {
    res.status(500).json({ message: "some error" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      fs.unlinkSync(req.file.path);

      try {
        for (const item of results) {
          await Todo.create({
            title: item.title,
            status: item.status,
            description: item.description,
          });
        }
        res
          .status(200)
          .json({
            message: "File uploaded and todos saved successfully",
            data: results,
          });
      } catch (error) {
        res
          .status(500)
          .json({
            message: "Error saving todos to the database",
            error: error.message,
          });
      }
    })
    .on("error", (error) => {
      res
        .status(500)
        .json({ message: "Error processing file", error: error.message });
    });
};

const downloadTodosCsv = async (req, res) => {
  try {
    const todos = await Todo.find().lean();
    const fields = ['title', 'description', 'status']; 
    const parser = new Parser({ fields });
    const csv = parser.parse(todos);

    res.header('Content-Type', 'text/csv');
    res.attachment('todos.csv');
    res.send(csv)
  } catch (error) {
    res.status(500).json({ message: 'Error generating CSV' });
  }
};

const filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    
    if (status === 'all') {
      const tasks = await Todo.find();
      res.status(200).json({ data: tasks });
    } else {
      const query = status ? { status } : {}; 
      const tasks = await Todo.find(query); 
      res.status(200).json({ data: tasks });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  uploadCsv,
  upload,
  downloadTodosCsv,
  filterByStatus
};
