const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const connectDB = require('./config/dB');
const AuthRoute = require("./Routes/AuthRoute");
const todoRoutes = require('./Routes/TodoRoute');
const swaggerSpecs = require('./config/swagger')
require('dotenv').config();

const app = express();

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs))

app.get('/',(req,res)=>{
  res.send('server is live')
})
connectDB();

app.use(express.json());
app.use(cors());


app.use('/api',AuthRoute)
app.use('/api', todoRoutes);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
