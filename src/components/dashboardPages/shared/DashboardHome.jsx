import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const DashboardHome = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="text-center text-secondary text-6xl my-6 font-extrabold">
        {children} Dashboard
      </h1>
      <h1 className="text-center text-2xl text-primary my-4 font-bold uppercase">
        Welcome {user?.displayName}
      </h1>
    </div>
  );
};

export default DashboardHome;
