import axios from 'axios'; 

export const Axios = axios.create({
    baseURL : 'http://localhost:3001',
    headers: {
      "Content-Type":"application/json",
      Authorization:  `Bearer ${localStorage.getItem("token")}`,
    }
  
  })