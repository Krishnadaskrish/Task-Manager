import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Task from '../components/Task';
import Sidebar from "../components/Sidebar";

function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className={
      windowSize[0] >= 768 && isSideBarOpen
        ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
        : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
    }>
      {windowSize[0] >= 768 && (
        <Sidebar
         
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}
      <Header />
      <div className="pt-28 pl-9">
        <Task />
      </div>
    </div>
  );
}

export default Home;
