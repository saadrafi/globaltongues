import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { notifyWithTitle } from "../../../alerts/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../../../customhooks/AxiosInstance";

const UpdateClass = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const getAxios = AxiosInstance();

  const {
    data: classData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleClass", id],

    queryFn: async () => {
      const res = await getAxios.get(`/class/${id}`);
      return res.data;
    },
  });
  console.log(classData);
  const onSubmit = (data) => {
    const newClass = {
      className: data.className,
      classImage: data.classImage,
      price: parseFloat(data.price),
      availableSeat: parseInt(data.totalSeat),
    };
    // use axios to update data
    getAxios.put(`/class/${id}`, newClass).then((res) => {
      notifyWithTitle("Updated", "Class Updated Successfully");

      reset();
      navigate(-1);
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h1 className="text-center text-3xl text-primary my-4 font-bold">Update Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <div className=" grid grid-cols-2 gap-3">
          <div className=" space-y-1">
            <label className="text-lg">Class Name:</label>
            <input
              defaultValue={classData.className}
              {...register("className", {
                required: true,
              })}
              type="text"
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="class name"
            />
            {errors.className && <span className="text-red-500">This field is required</span>}
          </div>
          <div className=" space-y-1">
            <label className="text-lg">Class Image URL:</label>
            <input
              defaultValue={classData.classImage}
              {...register("classImage", {
                required: true,
              })}
              type="url"
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="class image"
            />
            {errors.classImage && <span className="text-red-500">This field is required</span>}
          </div>
          <div className=" space-y-1">
            <label className="text-lg">Available Seats:</label>
            <input
              defaultValue={classData.availableSeat}
              {...register("totalSeat", {
                required: true,
                min: 1,
              })}
              type="number"
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="seats"
            />
            {errors.totalSeat?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors.totalSeat?.type === "min" && (
              <span className="text-red-500">Minimum 1 seat is required</span>
            )}
          </div>
          <div className=" space-y-1">
            <label className="text-lg">Price:</label>
            <input
              defaultValue={classData.price}
              {...register("price", {
                required: true,
                min: 0.01,
              })}
              type="number"
              step="0.01"
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="price"
            />
            {errors.price?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors.price?.type === "min" && (
              <span className="text-red-500"> price can not be negative or zero </span>
            )}
          </div>
          <div className=" space-y-1">
            <label className="text-lg">Instructor Name:</label>
            <input
              type="text"
              defaultValue={user.displayName}
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="class name"
              disabled
            />
          </div>
          <div className=" space-y-1">
            <label className="text-lg">Instructor Email:</label>
            <input
              defaultValue={user.email}
              type="text"
              className="w-full rounded-md input input-bordered input-primary shadow-sm"
              placeholder="class name"
              disabled
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button type="submit" className="btn btn-wide btn-primary">
            Update Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
