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
