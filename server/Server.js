const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dB');
const AuthRoute = require("./Routes/AuthRoute");
const todoRoutes = require('./Routes/TodoRoute');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());


app.use('/api',AuthRoute)
app.use('/api', todoRoutes);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
