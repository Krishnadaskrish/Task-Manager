# Task - Manager 

Task Manager is a web application for managing tasks. It allows users to add, edit, delete, and view tasks. The application is built using React for the frontend and Node.js for the backend.

## Clean Architecture
This project adheres to the principles of Clean Architecture to ensure a modular, scalable, and maintainable codebase. Clean Architecture emphasizes the separation of concerns, making the system easier to test, maintain, and extend.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- View a list of tasks
- Register and login users
- Upload and download tasks via CSV file
- authentication and authorization
- Filter task according to the status of the task

## Demo video

[scrnli_8_1_2024_11-43-21 PM.webm](https://github.com/user-attachments/assets/12e62ef9-4fb1-483f-9f42-24051e4cf255)

## Technologies Used

### Frontend

- React
- Redux
- Redux Thunk
- Redux toolkit
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



## API Documentation

You can find the API documentation for this project at the following URL:

- [API Documentation](http://localhost:3001/api-docs)


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

2. **Install dependencies:**

    - Install backend dependencies:
        ```bash
        cd ./server
        npm install
        ```

    - Install frontend dependencies:
        ```bash
        cd ./client
        npm install
        ```

3. **Set up environment variables:**

    - Create a `.env` file in the `backend` directory with the following content:
        ```
        CONNECTION_STRING=your_database_uri
        ACCESS_TOKEN_SECRET=your_jwt_secret
        PORT = your_PORT
        ```

4. **Run the application:**

    - Start the backend server:
        ```bash
        cd server
        npm start
        ```

    - Start the frontend server:
        ```bash
        cd client
        npm start
        ```

The frontend application should now be running at `http://localhost:3000` and the backend server at `http://localhost:3001`.


    The frontend application should now be running at `http://localhost:3000` and the backend server at `http://localhost:3001`.

## Usage

1. **Register a new user:**
    - Click on the 'Register' button in the header and fill out the registration form.

2. **Login:**
    - Click on the 'Login' button in the header and fill out the login form.

3. **Add a new task:**
    - Click on the 'Add New Task' button and fill out the task details.

4. **Edit a task:**
    - Click on a task to open the edit modal and modify the task details.

5. **Delete a task:**
    - Click on the delete icon next to a task to remove it.

6. **Upload tasks via CSV:**
    - Click on the 'Upload CSV' button and select a CSV file to upload tasks.

7. **Download tasks as CSV:**
    - Click on the 'Download CSV' button to download the list of tasks as a CSV file.
