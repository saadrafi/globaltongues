import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const {
    data: classes = [],
    isLoading: isDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/class/");
      return res.data;
    },
  });
  return (
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
                <td>{item.status}</td>
                <td>{item?.feedback}</td>
                <td>
                  <Link to={`/update/${item._id}`} className="btn btn-primary">
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
