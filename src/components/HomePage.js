import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ getResponse }) {
  const [loading, setLoading] = React.useState();
  const navigate = useNavigate();

  async function startQuiz() {
    await getResponse();
    navigate("/quizpage");
  }

  return (
    <main className="homepage-body">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="homepage-body">
          <h1>QUIZ ME!</h1>
          <p>Confident enough to take a lil' quiz to test your IQ?</p>
          <div>
            <button
              className="gradient-button"
              onClick={() => {
                setLoading(true);
                startQuiz();
              }}
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
