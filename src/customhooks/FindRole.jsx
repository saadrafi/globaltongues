import React, { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FindRole = () => {
  const { user, loading } = useContext(AuthContext);
  // use axios secure with react query
  const { data: userRole, isLoading: isAdminLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${user?.email}`);
      return res.data.role;
    },
  });
  return [userRole, isAdminLoading];
};

export default FindRole;
