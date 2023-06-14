import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import FindRole from "../../../customhooks/FindRole";
import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaHome,
  FaUsers,
  FaUniversity,
  FaUserCheck,
  FaHistory,
} from "react-icons/fa";
import { SiGoogleclassroom, SiAddthis } from "react-icons/si";
import { MdAddToPhotos } from "react-icons/md";

const DashboardNav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userRole] = FindRole();
  const navItems = (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}>
        <FaHome></FaHome>
        Home
      </NavLink>
      {userRole === "admin" ? (
        <>
          <NavLink
            to="/dashboard/manageusers"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <FaUsers></FaUsers>
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/manageclass"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <FaUniversity></FaUniversity>
            Manage Class
          </NavLink>
        </>
      ) : userRole === "instructor" ? (
        <>
          <NavLink
            to="/dashboard/addclass"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <SiAddthis></SiAddthis>
            Add a class
          </NavLink>
          <NavLink
            to="/dashboard/myclasses"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <SiGoogleclassroom></SiGoogleclassroom>
            My Classes
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/dashboard/selected"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <MdAddToPhotos></MdAddToPhotos>
            Selected Classes
          </NavLink>
          <NavLink
            to="/dashboard/enrolled"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <FaUserCheck></FaUserCheck>
            Enrolled Classes
          </NavLink>
          <NavLink
            to="/dashboard/paymenthistory"
            className={({ isActive }) => (isActive ? "btn btn-link" : "btn btn-ghost")}
          >
            <FaHistory></FaHistory>
            Payments
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link>
            <img src="../../../public/logo.png" alt="" className="h-16" />
          </Link>
        </div>
        <div className="navbar-center flex">
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
        </div>
        <div className="navbar-end">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
