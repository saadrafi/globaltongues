import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import PaymentForm from "./PaymentForm";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import FullPageSpinner from "../../spinners/FullPageSpinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import setTitle from "../../../customhooks/setTitle";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const StripeContainer = () => {
  setTitle("Payment Gateway")
  const getAxios = AxiosInstance();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: selectClass = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["selectClasses", id],

    queryFn: async () => {
      const res = await getAxios.get(`/selectClass/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <FullPageSpinner></FullPageSpinner>;
  }

  const price = parseFloat(selectClass.price.toFixed(2));

  return (
    <Elements stripe={stripePromise}>
      <h1 className="text-center text-xl text-primary my-4 font-bold">Please Pay</h1>
      <PaymentForm price={price} classData={selectClass}></PaymentForm>
    </Elements>
  );
};

export default StripeContainer;
