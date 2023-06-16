import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import FindRole from "../../../customhooks/FindRole";
import { notifyError, notifyRequired, notifyWithTitle } from "../../../alerts/Alerts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import setTitle from "../../../customhooks/setTitle";
import Spinner from "../../spinners/Spinner";

const ClassesPage = () => {
  setTitle("All Classes");
  const { user } = useContext(AuthContext);
  const getAxios = AxiosInstance();
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole] = FindRole();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await getAxios.get("/class?status=approved");
      return res.data;
    },
  });

  const handleSelect = (classItem) => {
    if (!user) {
      Swal.fire({
        title: "Please SignIn to Select",
        text: "Would you like to sign in?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }

    if (userRole === "admin" || userRole === "instructor") {
      notifyError("You are not allowed to book a class");
    }
    if (user && userRole === "student") {
      if (classItem.availableSeat > 0) {
        const selectedClass = {
          classId: classItem._id,
          className: classItem.className,
          instructor: classItem.instructor,
          price: classItem.price,
          availableSeat: classItem.availableSeat,
          classImage: classItem.classImage,
          userEmail: user.email,
        };
        getAxios
          .post("/selectClass", selectedClass)
          .then((res) => {
            if (res.data.error) {
              notifyError(res.data.message);
            } else {
              notifyWithTitle("Booked", "Class Booked Successfully");
            }
          })
          .catch((err) => {
            notifyError(err.message);
          });
      } else {
        notifyError("No seat available");
      }
    }
  };
  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold my-3 text-primary">All Classes</h1>
      <div className="grid grid-cols-3 gap-3 my-8">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className={`${
              classItem.availableSeat == 0 ? "bg-red-500" : "bg-white"
            }  shadow-lg rounded-lg overflow-hidden font-serif`}
          >
            <img src={classItem.classImage} alt="" className="mx-auto h-52 p-4" />
            <div className="py-5 px-6 space-y-3">
              <h1 className="text-2xl text-center uppercase font-bold text-gray-800">
                {classItem.className}
              </h1>
              <div className="py-2 text-lg text-gray-700">
                <p className="">
                  <span className="text-sm font-semibold">Available Seat:</span>{" "}
                  {classItem.availableSeat}
                </p>
                <p className="">
                  <span className="text-sm font-semibold">Price:</span> ${classItem.price}
                </p>
              </div>
              <div className="py-2 text-lg text-gray-700">
                <span className="text-sm font-semibold">Instructor:</span>{" "}
                <span>{classItem.instructor}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  handleSelect(classItem);
                }}
                className={`${
                  userRole === "admin" || userRole === "instructor" || classItem.availableSeat === 0
                    ? "btn-disabled"
                    : "btn-primary"
                } text-white cursor-pointer w-full py-2 hover:scale-125 duration-300`}
              >
                Select Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
