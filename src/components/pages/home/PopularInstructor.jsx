import React from "react";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Fade, Slide } from "react-awesome-reveal";

const PopularInstructor = () => {
  const getAxios = AxiosInstance();

  // fetch instructors data
  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await getAxios.get("/instructors");
      return res.data;
    },
  });
  console.log(instructors);
  return (
    <div className="my-10">
      <h1 className="font-bold text-center text-3xl text-primary">Top Instructor</h1>
      <p className="font-bold text-center my-3">Here are our top instructor</p>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <Slide cascade delay={1000} duration={2000}>
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden my-5 mx-5"
              key={instructor._id}
            >
              <Fade cascade duration={2000}>
                <img src={instructor.image} alt="" className="mx-auto h-52 p-4" />
                <div className="py-5 px-6 space-y-3">
                  <h1 className="text-2xl text-center uppercase font-bold text-gray-800">
                    {instructor.name}
                  </h1>
                  <div className="py-2 text-lg text-gray-700">
                    <p className="text-center">
                      <span className="text-sm font-semibold font-mono">Email:</span>{" "}
                      {instructor.email}
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
          </Slide>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
