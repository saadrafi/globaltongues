import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { notifyError, notifyWithTitle } from "../../../alerts/Alerts";
const Register = () => {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setCnfShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { signUp, updateUser, signInWithGoogle, setLoading } = useContext(AuthContext);

  const sendUserdata = (newUser) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        notifyWithTitle("Successful", "Sign Up successful");
        console.log(data);
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
          role: "student",
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            notifyWithTitle("Successful", "Sign Up successful");
            console.log(data);
          })
          .catch((err) => {
            notifyError(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  const onSubmit = (data) => {
    setLoading(true);
    signUp(data.email, data.password)
      .then((res) => {
        updateUser(data.name, data.photoUrl)
          .then((res) => {
            const newUser = {
              name: data.name,
              email: data.email,
              image: data.photoUrl,
              role: "student",
            };
            sendUserdata(newUser);
          })
          .catch((err) => {
            notifyError(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        notifyError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className=" my-10 grid grid-cols-2 ">
      <div className="text-center my-auto space-y-4">
        <h1 className=" text-7xl font-bold text-primary">Welcome</h1>
        <p className="text-6xl font-semibold">Sign Up </p>
      </div>
      <div className="max-w-sm">
        <form className="form-control w-full " onSubmit={handleSubmit(onSubmit)}>
          {/* ----------------------------------- */}
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="enter username"
            className="input input-bordered w-full "
          />
          {errors.name && <span className=" text-xs text-red-700">This field is required</span>}
          {/* ----------------------------------- */}
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="enter your email"
            className="input input-bordered w-full "
          />
          {errors.email && <span className=" text-xs text-red-700">This field is required</span>}
          {/* -------------------------------------- */}
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
              })}
              type={showPassword ? "text" : "password"}
              className="w-full input input-bordered "
              placeholder="enter password"
              onChange={(e) => {
                if (e.target.value == getValues("confirmPassword")) {
                  setSubmit(true);
                } else {
                  setSubmit(false);
                }
              }}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer">
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)}></FaEyeSlash>
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)}></FaEye>
              )}
            </span>
          </div>
          {errors.password?.type === "required" && (
            <span className=" text-xs text-red-700">This field is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className=" text-xs text-red-700">Password must be at least 6 characters</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className=" text-xs text-red-700">
              Password must contain at least one uppercase letter and one special character
            </span>
          )}

          {/* ------------------------------------ */}
          <label className="label">
            <span className="label-text font-semibold">Confirm Password</span>
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showCnfPassword ? "text" : "password"}
              className={`w-full input input-bordered focus:outline ${
                submit ? "focus:outline-green-700" : "focus:outline-red-700"
              }  outline-offset-2`}
              placeholder="confirm password"
              onChange={(e) => {
                if (e.target.value == getValues("password")) {
                  setSubmit(true);
                } else {
                  setSubmit(false);
                }
              }}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer">
              {showCnfPassword ? (
                <FaEyeSlash onClick={() => setCnfShowPassword(!showCnfPassword)}></FaEyeSlash>
              ) : (
                <FaEye onClick={() => setCnfShowPassword(!showCnfPassword)}></FaEye>
              )}
            </span>
          </div>
          {/* -------------------------------------- */}
          <label className="label">
            <span className="label-text font-semibold">Photo URL</span>
          </label>
          <input
            {...register("photoUrl")}
            type="url"
            placeholder="photo url"
            className="input input-bordered w-full "
          />

          <button
            type="submit"
            className={`block w-full mt-3  px-5 py-3 text-sm font-medium text-white hover:scale-105 duration-300 ${
              submit ? " bg-primary  " : "btn-disabled "
            }`}
          >
            Sign Up
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="bg-white border py-2 w-full mt-5 flex gap-2 justify-center items-center text-sm hover:scale-105 duration-300 text-primary "
        >
          <FaGoogle></FaGoogle>
          Sign up with Google
        </button>

        <p className="text-end text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="underline btn-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
