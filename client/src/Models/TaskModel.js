import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../features/todos/todoSlice';
import AddEditTaskModal from './AddEditTaskModel';
import DeleteModal from './DeleteModel';

function TaskModal({ taskIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // Ensure hooks are called unconditionally
  const task = todos ? todos[taskIndex] : null;

  
  const [status, setStatus] = useState(task ? task.status : '');

  if (!task) {
    return null; // Return null if task is not found
  }

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* MODAL SECTION */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
        </div>
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {/* Assuming status options */}
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="mt-8 flex justify-between">
          
          <button
            onClick={setOpenDeleteModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
