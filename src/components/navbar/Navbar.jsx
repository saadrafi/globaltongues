import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}>
        Home
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}>
        Instructors
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}>
        Classes
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}>
        Dashboard
      </NavLink>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            )}
          </div>
          <Link>
            <img src="../../../public/logo.png" alt="" className="h-16" />
          </Link>
        </div>
        <div className="navbar-end flex">
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="md:h-11 md:w-11 h-11">
              <FaUserCircle className="h-full w-full" />
            </div>
            <Link className="btn btn-primary">Log out</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
