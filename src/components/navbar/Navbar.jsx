import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import FindRole from "../../customhooks/FindRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut, role } = useContext(AuthContext);
  const [userRole] = FindRole();
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
      {userRole === "admin" ? (
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
        >
          Dashboard
        </NavLink>
      ) : userRole === "instructor" ? (
        <NavLink
          to="/dashboard/instructor"
          className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
        >
          Dashboard
        </NavLink>
      ) : (
        user && (
          <NavLink
            to="/dashboard/student"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            Dashboard
          </NavLink>
        )
      )}
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
            {user && (
              <div className="md:h-11 md:w-11 h-11">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="rounded-full h-full w-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-full w-full text-3xl" />
                )}
              </div>
            )}
            {user ? (
              <button onClick={logOut} className="btn btn-primary">
                Log out
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
