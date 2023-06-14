import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedPage = () => {
  const { user } = useContext(AuthContext);
  const {
    data: selectClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["selectClasses", user?.email],

    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/selectClass?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(selectClasses);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You want to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/selectClass/${id}`).then(() => {
          refetch();
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-center text-xl text-primary my-4 font-bold">Selected Classes</h1>
      <div className="max-w-3xl  mx-auto">
        <div className="flex justify-evenly items-center">
          <p>Total Class: {selectClasses.length}</p>
          <p>Total Price: ${selectClasses.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
        </div>
        <div className="overflow-x-auto my-6">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Price</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {selectClasses.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.classImage} alt={item.className} className=" h-12 " />
                  </td>
                  <td>{item.className}</td>
                  <td>{item.instructor}</td>
                  <td>${item.price}</td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 px-2 py-1 rounded-sm text-white hover:bg-red-400"
                    >
                      Remove
                    </button>
                    <Link to={`/dashboard/payment/${item._id}`}>
                      <button className="bg-primary px-2 py-1 rounded-sm text-white hover:bg-success">
                        Payment
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelectedPage;
