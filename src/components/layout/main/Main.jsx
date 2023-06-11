import React from "react";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className=" lg:w-[95%] mx-auto flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
