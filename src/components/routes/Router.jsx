import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Dashboard from "../layout/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../dashboardPages/adminDashboard/ManageUsers";
import DashboardRoute from "./DashboardRoute";
import AddClassPage from "../dashboardPages/instructorDashboard/AddClassPage";
import MyClasses from "../dashboardPages/instructorDashboard/MyClasses";
import UpdateClass from "../dashboardPages/instructorDashboard/UpdateClass";
import ManageClass from "../dashboardPages/adminDashboard/ManageClass";
import Instructors from "../pages/instructors/Instructors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <DashboardRoute role="admin">
            <h1>Admin</h1>
          </DashboardRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <DashboardRoute role="admin">
            <ManageUsers></ManageUsers>
          </DashboardRoute>
        ),
      },
      {
        path: "manageclass",
        element: (
          <DashboardRoute role="admin">
            <ManageClass></ManageClass>
          </DashboardRoute>
        ),
      },
      {
        path: "instructor",
        element: (
          <DashboardRoute role="instructor">
            <h1>Instructor</h1>
          </DashboardRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <DashboardRoute role="instructor">
            <AddClassPage></AddClassPage>
          </DashboardRoute>
        ),
      },
      {
        path: "myclasses",
        element: (
          <DashboardRoute role="instructor">
            <MyClasses></MyClasses>
          </DashboardRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <DashboardRoute role="instructor">
            <UpdateClass></UpdateClass>
          </DashboardRoute>
        ),
      },
      {
        path: "student",
        element: (
          <DashboardRoute role="student">
            <h1>Student</h1>
          </DashboardRoute>
        ),
      },
    ],
  },
]);
