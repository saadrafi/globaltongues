import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dateFormat, { masks } from "dateformat";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import setTitle from "../../../customhooks/setTitle";
import Spinner from "../../spinners/Spinner";
import NoData from "../../spinners/NoData";

const PaymentHistory = () => {
  setTitle("Payments");
  const { user } = useContext(AuthContext);
  const getAxios = AxiosInstance();
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await getAxios.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return isLoading ? (
    <Spinner></Spinner>
  ) : payments?.length === 0 ? (
    <NoData></NoData>
  ) : (
    <div>
      <h1 className="text-center text-xl text-primary my-4 font-bold">Payments</h1>
      <div className="overflow-x-auto my-6">
        <table className="table mx-auto max-w-5xl">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {payments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.transactionId}</td>

                <td>${item.classPrice}</td>
                <td>{dateFormat(item.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
