import React, { useRef, useState } from 'react';
import Logo from "../assets/logo-mobile.svg";
import AddEditTaskModal from '../Models/AddEditTaskModel';
import LoginModal from '../Models/LoginModel'; 
import RegisterModal from '../Models/RegisterModel'; 
import { useDispatch } from 'react-redux';
import { uploadCsvThunk, fetchTodosThunk, downloadCsvThunk } from '../features/todos/tudosThunk'; 

function Header() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadCsvThunk(file)).then(() => {
        dispatch(fetchTodosThunk());
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleDownloadClick = () => {
    dispatch(downloadCsvThunk());
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={Logo} alt="Logo" className="h-6 w-6" />
          <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
            Task Manager
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {/* {board.name} */}
            </h3>
            <img
              alt="dropdown icon"
              className="w-3 ml-2 md:hidden"
            />
          </div>
        </div>
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
          <button
            onClick={handleButtonClick}
            className="button py-1 px-3"
          >
            Upload CSV
          </button>
          <button
            onClick={handleDownloadClick}
            className="button py-1 px-3"
          >
            Download CSV
          </button>
          {/* Add Register Button */}
          <button
            onClick={() => setIsRegisterModalOpen((prevState) => !prevState)}
            className="button py-1 px-3"
          >
            Register
          </button>
          {/* Add Login Button */}
          <button
            onClick={() => setIsLoginModalOpen((prevState) => !prevState)}
            className="button py-1 px-3"
          >
            Login
          </button>
        </div>
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
      {isRegisterModalOpen && (
        <RegisterModal setIsRegisterModalOpen={setIsRegisterModalOpen} />
      )}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />
    </div>
  );
}

export default Header;
