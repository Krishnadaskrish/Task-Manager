import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosThunk, updateTodoThunk } from "../features/todos/tudosThunk";
import AddEditTaskModal from '../Models/AddEditTaskModel';
import DeleteModal from '../Models/DeleteModel';

const TodosList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log(todos, 'todo data');
  }, [todos]);

  const setOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsAddTaskModalOpen(true);
  };

  const setOpenDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const openTaskModal = (index) => {
    setSelectedTaskIndex(index);
    setIsTaskModalOpen(true);
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({ selectedTaskIndex }));
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {

    setIsDeleteModalOpen(false); 
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {todos && todos.map((task, index) => (
        <div
          key={task._id}
          onClick={() => openTaskModal(index)}
          draggable
          onDragStart={handleOnDrag}
          className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
        >
          <p className="font-bold tracking-wide">{task.title}</p>
          <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
            {task.description}
          </p>
          <div className="flex items-center mt-2">
            <span
              className={`status-indicator ${task.status === 'Pending' ? 'status-pending' : 'status-completed'}`}
              title={task.status}
            ></span>
            <span className="ml-2 text-sm">{task.status}</span>
          </div>
          <div className='flex gap-28'>
            <div className='mt-4'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEditModal(task);
                }}
                className="Ebutton py-1 px-3"
              >
                Edit
              </button>
            </div>
            <div className='mt-4 '>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteModal(task);
                }}
                className="Dbutton py-1 px-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          task={selectedTask}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="edit"
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TodosList;
