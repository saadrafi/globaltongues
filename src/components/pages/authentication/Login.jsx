import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { notifyError, notifyWithTitle } from "../../../alerts/Alerts";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, setLoading, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        setLoading(false);
        notifyWithTitle("Successful", "Sign In successful");
        
        navigate(from, { replace: true });
      })
      .catch((err) => {
        notifyError(err.message);
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
            navigate(from, { replace: true });
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
        <button
          onClick={handleGoogleSignIn}
          className="bg-white border py-2 w-full mt-5 flex gap-2 justify-center items-center text-sm hover:scale-105 duration-300 text-primary "
        >
          <FaGoogle></FaGoogle>
          Login with Google
        </button>

        <p className="text-end text-sm text-gray-500">
          No account?
          <Link state={{ from: from }} to="/register" className="underline btn-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
