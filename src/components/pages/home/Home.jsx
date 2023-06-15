import React from "react";
import Banner from "./Banner";
import PopularInstructor from "./PopularInstructor";
import PopolarClasses from "./PopolarClasses";
import QuizSection from "./QuizSection";
import setTitle from "../../../customhooks/setTitle";

const Home = () => {
  setTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <PopolarClasses></PopolarClasses>
      <PopularInstructor></PopularInstructor>
      <QuizSection></QuizSection>
    </div>
  );
};

export default Home;
