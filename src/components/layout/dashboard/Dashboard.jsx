import React from "react";
import DashboardNav from "../../dashboardPages/shared/DashboardNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-[95%] mx-auto">
      <DashboardNav></DashboardNav>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
