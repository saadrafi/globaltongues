import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import setTitle from "../../../customhooks/setTitle";
import Spinner from "../../spinners/Spinner";

const Instructors = () => {
  setTitle("All Instructor");
  const getAxios = AxiosInstance();

  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await getAxios.get("/users?role=instructor");
      return res.data;
    },
  });

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold my-3 text-primary">Instructors</h1>
      <div className="grid grid-cols-2 gap-3 my-8">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={instructor.image} alt="" className="mx-auto h-52 p-4" />
            <div className="py-5 px-6">
              <h1 className="text-2xl text-center uppercase font-bold text-gray-800">
                {instructor.name}
              </h1>
              <p className="py-2 text-center text-lg text-gray-700">{instructor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
