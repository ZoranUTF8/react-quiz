import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

//* table for mathicng select values to API category code
const table = {
  sports: 21,
  history: 23,
  politics: 24,
  generalKnowledge: 9,
  scienceAndNature: 17,
  scienceComputers: 18,
  geography: 22,
  art: 25,
  videoGames: 15,
  movies: 11,
  books: 10,
  music: 12,
  television: 14,
  mythology: 20,
  animals: 27,
  celebrities: 26,
  vehicles: 28,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //! states

  //* context state
  const [waiting, setWaiting] = useState(true); //* game setup
  const [loading, setLoading] = useState(false); //* fetching data
  const [questions, setQuestions] = useState([]); //* questions array
  const [index, setIndex] = useState(0); //* index for question number
  const [correct, setCorrect] = useState(0); //* correct answers
  const [error, setError] = useState(false); //* error value
  const [isModalOpen, setIsModalOpen] = useState(false); //* game over modal

  //* setupForm state
  //? if we have a couple of contoloed inputs better to make it as an object
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  //! end states

  //! custom functions

  //* get questions from api
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios.get(url).catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };
  //* check answer
  //? if we presss next question without answeing than we just skip the current one
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
      nextQuestion()
    } else {
      nextQuestion();
    }
  };
  //* handle next question button
  const nextQuestion = () => {
    setIndex((oldIndexValue) => {
      const index = oldIndexValue + 1;
      if (index > questions.length - 1) {
        //? if lsat question than open the modal
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  //* open modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  //* close modal
  const closeModal = () => {
    //? start from start and show the set up form
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };
  //* handle change from setup form
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    //? spread the old value when an update occurs so we do not lose the old values inside the quiz object
    //? dinamicaly changing values
    setQuiz({ ...quiz, [name]: value });
  };
  //* handleSubmit from setup form
  //? fetch new set of questions once form submited
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { amount, category, difficulty } = quiz;
    //* construct the desired api url params
    const url = `${API_ENDPOINT}amount=${amount}&difficulty${difficulty}&category=${table[category]}&type=multiple`;
  
    fetchQuestions(url);
  };

  //! end functions

  //! main return

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
