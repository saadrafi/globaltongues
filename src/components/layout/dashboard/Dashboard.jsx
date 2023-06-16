import React from "react";
import DashboardNav from "../../dashboardPages/shared/DashboardNav";
import { Outlet } from "react-router-dom";
import FindRole from "../../../customhooks/FindRole";
import FullPageSpinner from "../../spinners/FullPageSpinner";
import Footer from "../../footer/Footer";

const Dashboard = () => {
  const [userRole, isRoleLoading] = FindRole();
  return !isRoleLoading ? (
    <>
      <div className="w-[95%] mx-auto flex flex-col min-h-screen">
        <DashboardNav></DashboardNav>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  ) : (
    <FullPageSpinner></FullPageSpinner>
  );
};

export default Dashboard;
