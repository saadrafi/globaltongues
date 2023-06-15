import React from "react";
import Banner from "./Banner";
import PopularInstructor from "./PopularInstructor";
import PopolarClasses from "./PopolarClasses";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopolarClasses></PopolarClasses>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
