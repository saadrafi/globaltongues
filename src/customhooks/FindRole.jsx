import React, { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AxiosInstance from "./AxiosInstance";

const FindRole = () => {
  const getAxios = AxiosInstance();
  const { user, loading, setLoading } = useContext(AuthContext);
  // use axios secure with react query
  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await getAxios.get(`/users/${user?.email}`);
      return res.data.role;
    },
  });

  return [userRole, isRoleLoading];
};

export default FindRole;
