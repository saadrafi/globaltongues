import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { notifyWithTitle } from "../../../alerts/Alerts";

const ManageClass = () => {
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],

    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/class/");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    axios
      .put(`http://localhost:3000/class/${id}`, {
        status: "approved",
      })
      .then((res) => {
        refetch();
      });
  };

  const handleReject = (id) => {
    axios
      .put(`http://localhost:3000/class/${id}`, {
        status: "denied",
      })
      .then((res) => {
        refetch();
      });
  };

  const handleFeedback = async (id) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Feedback",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      axios
        .put(`http://localhost:3000/class/${id}`, {
          feedback: text,
        })
        .then((res) => {
          notifyWithTitle("Send", "Feedback Send Successfully");
          refetch();
        });
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl text-primary">Manage Classes</h1>
      <div className="overflow-x-auto my-7">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Instructor Details</th>
              <th>Available Seat</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="mask w-12 h-8">
                    <img src={item.classImage} alt="classimg" />
                  </div>
                </td>
                <td>{item.className}</td>
                <td>
                  <div>
                    <div className="font-bold">{item.instructor}</div>
                    <div className="text-sm opacity-50">{item.instructorEmail}</div>
                  </div>
                </td>
                <td>{item.availableSeat}</td>
                <td>${item.price}</td>
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
                <td className="space-x-2">
                  <button
                    onClick={() => {
                      handleApprove(item._id);
                    }}
                    className={`btn btn-xs ${
                      item.status !== "pending" ? "btn-disabled" : "btn-success"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(item._id);
                    }}
                    className={`btn btn-xs ${
                      item.status !== "pending" ? "btn-disabled" : "btn-error"
                    }`}
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => {
                      handleFeedback(item._id);
                    }}
                    className="btn btn-info btn-xs"
                  >
                    Send Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClass;
