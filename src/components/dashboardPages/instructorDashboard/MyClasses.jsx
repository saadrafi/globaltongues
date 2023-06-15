import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import AxiosInstance from "../../../customhooks/AxiosInstance";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const getAxios = AxiosInstance();
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes", user?.email],

    queryFn: async () => {
      const res = await getAxios.get(`/classes/${user?.email}`);
      return res.data;
    },
  });
  console.log(classes);
  return (
    !isLoading && (
      <div>
        <h1 className="text-center text-3xl text-primary my-4 font-bold">My Classes</h1>
        <div className="overflow-x-auto my-6">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Available Seats</th>
                <th>Enrolled Student</th>
                <th>Status</th>
                <th>Feedback</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {classes.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.className}</td>
                  <td>${item.price}</td>
                  <td>{item.availableSeat}</td>
                  <td>{item.enrolledStudent}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "pending"
                          ? "badge-warning"
                          : item.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.status === "denied" ? item?.feedback : ""}</td>
                  <td>
                    <Link to={`/dashboard/update/${item._id}`} className="btn btn-primary">
                      Update
                    </Link>
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

export default MyClasses;
