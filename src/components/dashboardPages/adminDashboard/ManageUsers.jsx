import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import AxiosInstance from "../../../customhooks/AxiosInstance";

const ManageUsers = () => {
  const getAxios = AxiosInstance();
  const [loading, setLoading] = useState(false);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await getAxios.get("/users/");
      return res.data;
    },
  });

  const makeInstructor = (id) => {
    setLoading(true);
    getAxios
      .put(`/users/${id}`, {
        role: "instructor",
      })
      .then((res) => {
        refetch();
        setLoading(false);
      });
  };

  const makeAdmin = (id) => {
    setLoading(true);
    getAxios
      .put(`/users/${id}`, {
        role: "admin",
      })
      .then((res) => {
        refetch();
        setLoading(false);
      });
  };

  return (
    !isLoading && (
      <div>
        <h1 className="text-center text-4xl text-primary">All Users</h1>
        <div className="overflow-x-auto my-6">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => {
                        makeAdmin(user._id);
                      }}
                      className={`btn btn-sm  ${
                        user.role === "admin" ? " btn-disabled" : "btn-primary btn-outline"
                      }`}
                    >
                      Make Admin
                      <span
                        className={`loading loading-spinner loading-xs ${
                          loading ? "block" : "hidden"
                        }`}
                      ></span>
                    </button>
                    <button
                      onClick={() => {
                        makeInstructor(user._id);
                      }}
                      className={`btn btn-sm  ${
                        user.role === "instructor" || user.role === "admin"
                          ? " btn-disabled"
                          : "btn-primary btn-outline"
                      }`}
                    >
                      Make Instructor
                      <span
                        className={`loading loading-spinner loading-xs ${
                          loading ? "block" : "hidden"
                        }`}
                      ></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default ManageUsers;
