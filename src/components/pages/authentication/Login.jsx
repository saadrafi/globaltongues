import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className=" my-10 grid grid-cols-2 ">
      <div className="text-center my-auto space-y-4">
        <h1 className="text-7xl font-bold text-primary">Welcome Back</h1>
        <p className="text-6xl font-semibold">Sign In</p>
      </div>
      <div className="max-w-sm">
        <form className="form-control w-full " onSubmit={handleSubmit(onSubmit)}>
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
            <span className="label-text">Password</span>
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

          <button
            type="submit"
            className="block w-full mt-3 bg-primary px-5 py-3 text-sm font-medium text-white hover:scale-105 duration-300"
          >
            Sign in
          </button>
        </form>
        <div className="divider">OR</div>
        <button className="bg-white border py-2 w-full mt-5 flex gap-2 justify-center items-center text-sm hover:scale-105 duration-300 text-primary ">
          <FaGoogle></FaGoogle>
          Login with Google
        </button>

        <p className="text-end text-sm text-gray-500">
          No account?
          <Link to="/register" className="underline btn-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;