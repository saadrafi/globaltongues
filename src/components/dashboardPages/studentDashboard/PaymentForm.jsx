import {
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { notifyWithTitle } from "../../../alerts/Alerts";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../../spinners/FullPageSpinner";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import Spinner from "../../spinners/Spinner";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PaymentForm = ({ price, classData }) => {
  const getAxios = AxiosInstance();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const generateClientSecret = async () => {
      const response = await getAxios.post("/payment", {
        amount: price,
      });
      setClientSecret(response.data.clientSecret);
    };
    generateClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    // Get the payment method details by passing your `PaymentMethod` object to this function
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (payload.error) {
      setCardError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setCardError(null);
      console.log("payment intent", payload.paymentIntent);
      setProcessing(false);
      setTransactionId(payload.paymentIntent.id);
    }

    if (payload.paymentIntent.status === "succeeded") {
      setLoading(true);
      const newPayment = {
        transactionId: payload.paymentIntent.id,
        userName: user.displayName,
        userEmail: user.email,
        classId: classData.classId,
        className: classData.className,
        classPrice: classData.price,
        classImage: classData.classImage,
        instructor: classData.instructor,

        date: new Date(),
        status: "paid",
      };
      const res = await getAxios.post("/paymentSuccess", newPayment);
      if (res.data.acknowledged) {
        getAxios
          .put(`/selectClass/${classData.classId}`)
          .then((res) => {
            getAxios
              .delete(`/selectClass/${classData._id}`)
              .then(() => {
                setLoading(false);
                notifyWithTitle("Done", "Payment Successful");

                navigate(-1);
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardElement options={CARD_OPTIONS}></CardElement>
        <button
          className={`btn w-full  btn-success `}
          type="submit"
          disabled={!stripe || processing || !clientSecret}
        >
          Pay
        </button>
      </form>

      {cardError && <p className="text-red-500 mt-5">{cardError}</p>}
      {
        <p className="text-green-500 mt-5">
          {transactionId && `Payment Successful. Transaction Id: ${transactionId}`}
        </p>
      }
      {loading && <Spinner></Spinner>}
    </div>
  );
};

export default PaymentForm;
