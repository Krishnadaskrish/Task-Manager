# Task - Manager 

Task Manager is a web application for managing tasks. It allows users to add, edit, delete, and view tasks. The application is built using React for the frontend and Node.js for the backend.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- View a list of tasks
- Register and login users
- Upload and download tasks via CSV file
- authentication and authorization
- Filter task according to the status of the task


## Technologies Used

### Frontend

- React
- Redux
- Redux Thunk
- Tailwind CSS

  ### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (for validation)
- Jwt (auth)

### Redux

Redux is a state management library for JavaScript applications. It helps manage the state of your application in a predictable way. In this project, Redux is used to manage the state of tasks and user authentication. By using Redux, the state of the application can be shared across components, making it easier to manage and debug.

### Redux Thunk

Redux Thunk is a middleware for Redux that allows you to write action creators that return a function instead of an action. This is particularly useful for handling asynchronous operations, such as API calls. In this project, Redux Thunk is used to manage asynchronous actions like fetching tasks, logging in, and registering users. This helps keep the Redux actions clean and focused on state changes, while the asynchronous logic is handled in the thunks.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

  1. **Clone the repository:**
    ```bash
    git clone https://github.com/Krishnadaskrish/Task-Manager.git
    cd Task manager
    ```
