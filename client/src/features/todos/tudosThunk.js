import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, createTodo,updateTodo, deleteTodo, uploadCsv, downloadCsv,fetchTodosWithFilter,loginUser,register } from '../../api';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await register(user);
      localStorage.setItem("token", response.data);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const todos = await fetchTodos();
      return todos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, title, description, status }, { rejectWithValue }) => {
    try {
      const updatedTask = { title, description, status };
      const response = await updateTodo(id, updatedTask);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodoThunk = createAsyncThunk(
  'todos/createTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const newTodo = await createTodo(todo);
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadCsvThunk = createAsyncThunk(
  'todos/uploadCsv',
  async (file, { rejectWithValue }) => {
    try {
      await uploadCsv(file);
      return file.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadCsvThunk = createAsyncThunk(
  'todos/downloadCsv',
  async (_, { rejectWithValue }) => {
    try {
      const data = await downloadCsv();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredTodosThunk = createAsyncThunk(
  'todos/fetchFilteredTodos',
  async (status, { rejectWithValue }) => {
    try {
      const todos = await fetchTodosWithFilter(status); 
      return todos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
