import axios from 'axios'; 

export const Axios = axios.create({
    baseURL : 'https://task-manager-hpkt.onrender.com',
    headers: {
      "Content-Type":"application/json",
      Authorization:  `Bearer ${localStorage.getItem("token")}`,
    }
  
  })