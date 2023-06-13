import React from "react";
import DashboardNav from "../../dashboardPages/shared/DashboardNav";
import { Outlet } from "react-router-dom";
import FindRole from "../../../customhooks/FindRole";
import FullPageSpinner from "../../spinners/FullPageSpinner";

const Dashboard = () => {
  const [userRole, isRoleLoading] = FindRole();
  return !isRoleLoading ? (
    <div className="w-[95%] mx-auto">
      <DashboardNav></DashboardNav>
      <Outlet></Outlet>
    </div>
  ) : (
    <FullPageSpinner></FullPageSpinner>
  );
};

export default Dashboard;
