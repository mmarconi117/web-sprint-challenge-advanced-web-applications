// ... (your imports)
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import axiosWithAuth from '../axios/index';
// import './App.css';
import axios from 'axios';

import LoginForm from './LoginForm';
import ArticleForm from './ArticleForm';
import Articles from './Articles';
import Spinner from './Spinner';
import Message from './Message'
import { Navigate } from 'react-router-dom';
import PT from 'prop-types';






export default function App() {
  // ✨ MVP can be achieved with these states
  // ✨ MVP can be achieved with these states
  // ✨ Research `useNavigate` in React Router v.6
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);
  const navigate = useNavigate();
  const currentArticle = articles.find(article => article.article_id === currentArticleId);


  const redirectToArticles = () => {
    navigate('/articles');
  };

  const redirectToLogin = () => {
    navigate('/');
  }

  // ✨ implement
  // If a token is in local storage it should be removed,
  // and a message saying "Goodbye!" should be set in its proper state.
  // In any case, we should redirect the browser back to the login screen,
  // using the helper above.
  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    redirectToLogin();
  };

  // ✨ implement
  // We should flush the message state, turn on the spinner
  // and launch a request to the proper endpoint.
  // On success, we should set the token to local storage in a 'token' key,
  // put the server success message in its proper state, and redirect
  // to the Articles screen. Don't forget to turn off the spinner!
  const login = ({ username, password }) => {
    setMessage('');
    setSpinnerOn(true);

    axios
      .post('http://localhost:9000/api/login', { username, password })
      .then((response) => {
        const token = response.data.token;
        console.log(token);
        window.localStorage.setItem('token', token);
        setMessage(response.data.message);
        // setSpinnerOn(false);
        redirectToArticles();
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.data.message);
        // setSpinnerOn(false);
      })
      .finally(() => {
        setSpinnerOn(false);
      })
  };

  // ✨ implement
  // We should flush the message state, turn on the spinner
  // and launch an authenticated request to the proper endpoint.
  // On success, we should set the articles in their proper state and
  // put the server success message in its proper state.
  // If something goes wrong, check the status of the response:
  // if it's a 401 the token might have gone bad, and we should redirect to login.
  // Don't forget to turn off the spinner!
  const getArticles = () => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth()
      .get('http://localhost:9000/api/articles') // Adjust the endpoint based on your API
      .then((response) => {
        console.log('API Response:', response.data);
        const { articles } = response.data;
        setArticles(articles);
        setMessage(response.data.message);
        setSpinnerOn(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          redirectToLogin();
        } else {
          setMessage('Error fetching articles');
          setSpinnerOn(false);
        }
      });
  };

  // ✨ implement
  // The flow is very similar to the `getArticles` function.
  // You'll know what to do! Use log statements or breakpoints
  // to inspect the response from the server.
  const postArticle = (article) => {
    setMessage('');
    setSpinnerOn(true);

    // Check if the article is empty before making the request
    if (!article.title.trim() || !article.text.trim() || !article.topic.trim()) {
      setMessage('Please fill out all fields');
      setSpinnerOn(false);
      return; // Exit the function if the article is empty
    }

    axiosWithAuth()
      .post(`http://localhost:9000/api/articles`, article)
      .then((response) => {
        console.log(response.data.article);
        if (response.data && response.data.article && response.data.article.article_id) {
          setArticles((prevArticles) => [...prevArticles, response.data.article]);
          setMessage(response.data.message);
          setSpinnerOn(false);

        }// } else {
        //   console.error('Invalid response structure:', response);
        //   setMessage(error.data.message);
        //   setSpinnerOn(false);
        // }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          redirectToLogin();
        } else {
          setMessage(error.data.message);
          setSpinnerOn(false);
        }
      });
  };







  // ✨ implement
  // You got this!
  const updateArticle = ({ article_id, article }) => {
    setMessage(''); // Flush the message state
    setSpinnerOn(true); // Turn on the spinner

    axiosWithAuth()
      .put(`http://localhost:9000/api/articles/${article_id}`, article)
      .then((response) => {
        console.log(response.data);

        // Update the local state with the edited article
        setArticles((prevArticles) =>
          prevArticles.map((prevArticle) =>
            prevArticle.article_id === article_id ? response.data.article : prevArticle
          )
        );

        setMessage(response.data.message); // Use the response message here
        setSpinnerOn(false);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.status === 401) {
          // Token might have gone bad, redirect to login
          redirectToLogin();
        }// } else if (error.response && error.response.status === 422) {
        //   // Handle validation error (422) - Display error message or log details
        //   setMessage(error.data.message); // Use the error response message here
        //   setSpinnerOn(false);
         else {
          setMessage(error.data.message); // Set a default error message
          setSpinnerOn(false);
        }
      });
  };







  // ✨ implement
  const deleteArticle = (article_id) => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth()
      .delete(`http://localhost:9000/api/articles/${article_id}`)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        setSpinnerOn(false);

        // Update local state to remove the deleted article
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.article_id !== article_id)
        );
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          redirectToLogin();
        } else {
          setMessage('Error deleting article');
          setSpinnerOn(false);
        }
      });
  };



  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner loading={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route
            path="articles"
            element={
              <>
                <ArticleForm
                  postArticle={postArticle}
                  updateArticle={updateArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  getArticles={getArticles}
                  currentArticle={currentArticle}
                />
                {/* Ensure that `articles` is an array when passing it to the Articles component */}
                <Articles
                  articles={articles} // Make sure `articles` is an array
                  updateArticle={updateArticle}
                  deleteArticle={deleteArticle}
                  getArticles={getArticles}
                  setCurrentArticleId={setCurrentArticleId}
                />
              </>
            }
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  );
}



// ✨ MVP can be achieved with these states
// ✨ Research `useNavigate` in React Router v.6
// ✨ implement
// If a token is in local storage it should be removed,
// and a message saying "Goodbye!" should be set in its proper state.
// In any case, we should redirect the browser back to the login screen,
// using the helper above.
// ✨ implement
// We should flush the message state, turn on the spinner
// and launch a request to the proper endpoint.
// On success, we should set the token to local storage in a 'token' key,
// put the server success message in its proper state, and redirect
// to the Articles screen. Don't forget to turn off the spinner!
// ✨ implement
// We should flush the message state, turn on the spinner
// and launch an authenticated request to the proper endpoint.
// On success, we should set the articles in their proper state and
// put the server success message in its proper state.
// If something goes wrong, check the status of the response:
// if it's a 401 the token might have gone bad, and we should redirect to login.
// Don't forget to turn off the spinner!
// ✨ implement
// The flow is very similar to the `getArticles` function.
// You'll know what to do! Use log statements or breakpoints
// to inspect the response from the server.
// ✨ implement
// You got this!
// ✨ implement
