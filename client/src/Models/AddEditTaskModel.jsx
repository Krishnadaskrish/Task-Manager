import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTodoThunk, updateTodoThunk } from "../features/todos/tudosThunk";

function AddEditTaskModal({ type, task, setIsAddTaskModalOpen }) {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("Todo");

  useEffect(() => {
    if (type === "edit" && task) {
      setTaskName(task.title);
      setTaskDescription(task.description);
      setStatus(task.status);
    } else {
      setTaskName("");
      setTaskDescription("");
      setStatus("Todo");
    }
  }, [type, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: taskName,
      description: taskDescription,
      status,
    };
    if (type === "edit") {
      dispatch(updateTodoThunk({ id: task._id, ...updatedTask })).then(() => {
        setIsAddTaskModalOpen(false);
      });
    } else {
      dispatch(createTodoThunk(updatedTask)).then(() => {
        setIsAddTaskModalOpen(false);
      });
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Task Name */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Task Name
            </label>
            <input
              id="task-name-input"
              type="text"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="Note the pending task "
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Description
            </label>
            <textarea
              id="task-description-input"
              className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
              placeholder="write an description about the task "
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          {/* Current Status */}
          <div className="mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Current Status
            </label>
            <select
              className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todo">Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full mt-4"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
