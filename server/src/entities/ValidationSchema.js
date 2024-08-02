const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string()
    .trim() 
    .required(),
  description: Joi.string()
    .trim()
    .required(),
  status: Joi.string()
    .valid('Pending', 'Completed')
    .required(),
});



const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required() 
});

module.exports = {todoSchema,userSchema}

