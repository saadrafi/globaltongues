import React, { useState } from "react";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

const QuizSection = () => {
  const [loadQuiz, setLoadQuiz] = useState(false);
  const [load, setLoad] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const getAxios = AxiosInstance();

  const { data: quiz = [], isLoading } = useQuery({
    queryKey: ["quiz"],
    enabled: load,
    queryFn: async () => {
      const res = await getAxios.get("/quiz");
      setLoad(false);
      return res.data;
    },
  });
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="my-10">
      <h1 className="font-bold text-center text-4xl text-primary">Language Trivia</h1>
      <p className="font-bold text-center my-3">Test your Knowledge</p>

      <div>
        {showScore ? (
          <>
            <div className="h-32 flex flex-col justify-center items-center w-full">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden my-5 mx-5">
                <div className="py-5 px-6 space-y-3">
                  <h1 className="text-2xl text-center uppercase font-bold text-gray-800">
                    You scored {score} out of {quiz.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                onClick={() => {
                  setLoad(true);
                  setLoadQuiz(true);

                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          </>
        ) : loadQuiz && !isLoading && quiz.length > 0 ? (
          <div className=" space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-center text-primary">
                Question: <span>{currentQuestion + 1}</span> / {quiz.length}
              </h1>
            </div>
            <div>
              <p className="text-center text-3xl font-sans font-bold">
                {quiz[currentQuestion].questionText}
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              {quiz[currentQuestion].answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                  className="bg-primary text-white w-1/2 px-4 py-2 rounded-full"
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-32 flex justify-center items-center w-full">
            <button
              onClick={() => {
                setLoad(true);
                setLoadQuiz(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
