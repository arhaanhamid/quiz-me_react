import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import { nanoid } from "nanoid";

function App() {
  const [quizData, setQuizData] = useState([]);
  const optionSelected = [];

  async function getResponse() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&type=multiple"
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dataObj = await response.json();
    const data = dataObj.results;

    setQuizData(() => {
      //Modifying the incoming data from API to suit my needs,
      //Joining correct and incorrect answers in single array
      //randomizing that single array

      const allOptions = data.map((item) => {
        return [item.correct_answer, ...item.incorrect_answers];
      });

      allOptions.map((option, index) => {
        const tempAnswers = [];
        for (let i = 0; i < 4; i++) {
          Math.random() > 0.5
            ? tempAnswers.push({
                option: option[i],
                isHeld: false,
                id: nanoid(),
              })
            : tempAnswers.unshift({
                option: option[i],
                isHeld: false,
                id: nanoid(),
              });
        }
        data[index].all_answers = [...tempAnswers];
        return data;
      });
      return data;
    });
  }

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage getResponse={getResponse} />} />
          <Route
            path="/quizpage"
            element={
              <QuizPage quizData={quizData} optionSelected={optionSelected} />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
