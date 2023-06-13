import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import FindRole from "../../customhooks/FindRole";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { notifyRequired } from "../../alerts/Alerts";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <FullPageSpinner></FullPageSpinner>;
  }
  if (!user) {
    notifyRequired("Please SignIn First ");
    
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
