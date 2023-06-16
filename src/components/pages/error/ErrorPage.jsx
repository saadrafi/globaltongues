import React from "react";
import ParticlesBg from "particles-bg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className=" h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-6xl text-primary">404</h1>
        <h2 className=" text-7xl text-primary">Page Not Found</h2>
        <Link to="/" className="text-primary btn btn-error">
            Go Back
        </Link>
      </div>
      <ParticlesBg type="random" bg={true} />
    </div>
  );
};

export default ErrorPage;
