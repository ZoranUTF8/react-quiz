import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          {/* //* question amount */}
          <h2>Setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions?</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* //* question category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
              <option value="generalKnowledge">General knowledge</option>
              <option value="scienceAndNature">Science & nature</option>
              <option value="scienceComputers">Computer science</option>
              <option value="geography">Geography</option>
              <option value="art">Art</option>
              <option value="videoGames">Video games</option>
              <option value="movies">Movies</option>
              <option value="books">Books</option>
              <option value="music">Music</option>
              <option value="television">Television</option>
              <option value="mythology">Mythology</option>
              <option value="animals">Animals</option>
              <option value="celebrities">Celebrities</option>
              <option value="vehicles">Vehicles</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {/* //* error handler */}
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
