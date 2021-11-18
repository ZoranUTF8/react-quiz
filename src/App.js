import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
  const {
    //* get states from context.js
    waiting,
    loading,
    questions,
    correct,
    index,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  //! main return
  if (waiting) {
    return <SetupForm />;
  } else if (loading) {
    return <Loading />;
  } else {
    //* deconsturct the question object
    const { question, incorrect_answers, correct_answer } = questions[index];
    //* randomise answers to display
    let answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);

    if (tempIndex === 3) {
      //? put the answer at the last place
      answers.push(correct_answer);
    } else {
      //? take the item at tempIndex number abd put it at the end of the array, and than put the correct asnwer in its place
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
    }

    //! main return
    return (
      <main>
        <Modal />
        <section className="quiz">
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <article className="container">
            {/* we use the  dangerouslySetInnerHTML as the questions are*/}
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={() => {
                      checkAnswer(correct_answer === answer);
                    }}
                  />
                );
              })}
            </div>
          </article>
          <button className="next-question" onClick={nextQuestion}>
            next question
          </button>
        </section>
      </main>
    );
  }
}

export default App;
