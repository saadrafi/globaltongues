import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AxiosInstance from "../../../customhooks/AxiosInstance";

const EnrolledPage = () => {
  const { user } = useContext(AuthContext);
  const getAxios = AxiosInstance();
  const {
    data: enrolledClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["enrolled", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await getAxios.get(`/enrolled?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(enrolledClasses);

  return (
    <div>
      <h1 className="text-center text-xl text-primary my-4 font-bold">My Enrolled Classes</h1>
      <div className="overflow-x-auto my-6">
        <table className="table mx-auto max-w-4xl">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {enrolledClasses.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.classImage} alt="" className=" h-16 rounded" />
                </td>

                <td>{item.className}</td>
                <td>{item.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledPage;
