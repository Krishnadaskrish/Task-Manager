import { Axios } from "../Instance/AxiosInstance";
import axios from "axios";
import { toast } from "react-hot-toast";


const API_URL = 'http://localhost:3001'

const handleError = (error) => {
  if (error.response) {
    throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message}`);
  } else if (error.request) {
    throw new Error('Network Error: No response received from server.');
  } else {
    throw new Error(`Error: ${error.message}`);
  }
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/register`, userData);
  return response.data;
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password })
    localStorage.setItem("token", response.data.data);

    toast.success()
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchTodos = async () => {
  try {
    const response = await Axios.get(`/api/todos`);
    toast.success(response.data.message)
    console.log(response.data.data)
    return response.data.data;

  } catch (error) {
    handleError(error);
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await Axios.post(`/api/todos`, todo);
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    toast.error('error');
  }
};

export const updateTodo = async (id, updatedTask) => {
  try {
    const response = await Axios.put(`/api/todos/${id}`, updatedTask);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response =  await Axios.delete(`/api/todos/${id}`);
    toast.success(response.data.message);

  } catch (error) {
    handleError(error);
  }
};

export const uploadCsv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await Axios.post(`/api/todos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.data.message);
    return response.data;

  } catch (error) {
    handleError(error);
  }
};

export const downloadCsv = async () => {
  try {
    const response = await Axios.get(`/api/download`, {
      responseType: 'blob',
    });
    toast.success('successfully download todos');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchTodosWithFilter = async (status) => {
  try {
    const response = await Axios.get(`/api/filter`, {
      params: { status }, 
    });
    toast.success("Todos fetched successfully");
    return response.data.data; 
  } catch (error) {
    handleError(error);
    throw error; 
  }
};
