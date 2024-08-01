import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import useDarkMode from "../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredTodosThunk } from "../features/todos/tudosThunk";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "dark");
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    dispatch(fetchFilteredTodosThunk(filter));
  }, [dispatch, filter]);

  const toggleDarkMode = (checked) => {
    setTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    dispatch(fetchFilteredTodosThunk(status)); 
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
      >
        {isSideBarOpen && (
          <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
            <div className="mt-4">
            <button
                onClick={() => handleFilterChange("all")}
                className="text-blue-500 dark:text-blue-400 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("Pending")}
                className="text-red-500 dark:text-red-400 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Pending
              </button>
              <button
                onClick={() => handleFilterChange("Completed")}
                className="text-green-500 dark:text-green-400 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Completed
              </button>
            </div>
          </div>
        )}

        {isSideBarOpen ? (
          <div
            onClick={() => toggleSidebar()}
            className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
          >
            <img
              className="min-w-[20px]"
              src={hideSidebarIcon}
              alt="Hide sidebar"
            />
            <p>Hide Sidebar</p>
          </div>
        ) : (
          <div className="absolute p-5" onClick={() => toggleSidebar()}>
            <img src={showSidebarIcon} alt="Show sidebar" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
