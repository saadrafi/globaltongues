import React, { useContext } from "react";
import FindRole from "../../customhooks/FindRole";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const DashboardRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, isRoleLoading] = FindRole();
  if (isRoleLoading || loading) {
    return <FullPageSpinner></FullPageSpinner>;
  }
  if (user && userRole == role) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default DashboardRoute;
