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
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [currentArticleId, setCurrentArticleId] = useState();
    const [spinnerOn, setSpinnerOn] = useState(false);



    const navigate = useNavigate();

    const redirectToLogin = () => {
      navigate('/');
    };

    const redirectToArticles = () => {
      navigate('/articles');
    };

    const logout = () => {
      localStorage.removeItem('token');
      setMessage('Goodbye!');
      redirectToLogin();
    };

    const login = ({ username, password }) => {
      setMessage('');
      setSpinnerOn(true);

      axios.post('http://localhost:9000/api/login', { username, password })
        .then((response) => {
          const token = response.data.token;
          console.log(token)
          localStorage.setItem('token', token);
          setMessage(response.data.message);
          setSpinnerOn(false);
          redirectToArticles();
        })
        .catch((error) => {
          console.error(error);
          setMessage('Login failed');
          setSpinnerOn(false);
        });
    };


    const getArticles = () => {
      setMessage('');
      setSpinnerOn(true);

      axiosWithAuth()
        .get('http://localhost:9000/api/articles')  // Adjust the endpoint based on your API
        .then((response) => {
          console.log(response)
          setArticles(response.data);
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

  const postArticle = (article) => {
    // ✨ implement
    setMessage(''); // Flush the message state
    setSpinnerOn(true); // Turn on the spinner
    // Launch an authenticated request to the create article endpoint
    axiosWithAuth()
      .post(`http://localhost:9000/api/articles`, articles)
      .then((response) => {
        console.log(response);
        // Handle success, possibly update the articles state or show a success message
        setMessage('Article posted successfully');
        setSpinnerOn(false); // Turn off the spinner
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          // Token might have gone bad, redirect to login
          redirectToLogin();
        } else {
          setMessage('Error posting article'); // Set an error message
          setSpinnerOn(false); // Turn off the spinner
        }
      });
  };

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    setMessage(''); // Flush the message state
    setSpinnerOn(true); // Turn on the spinner
    // Launch an authenticated request to the update article endpoint
    axiosWithAuth()
      .put(`http://localhost:9000/api/articles/${article_id}`, article)
      .then((response) => {
        console.log(response.data);
        // Handle success, possibly update the articles state or show a success message
        setMessage('Article updated successfully');
        setSpinnerOn(false); // Turn off the spinner
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          // Token might have gone bad, redirect to login
          redirectToLogin();
        } else {
          setMessage('Error updating article'); // Set an error message
          setSpinnerOn(false); // Turn off the spinner
        }
      });
  };

  const deleteArticle = (article_id) => {
    // ✨ implement
    setMessage(''); // Flush the message state
    setSpinnerOn(true); // Turn on the spinner
    // Launch an authenticated request to the delete article endpoint
    axiosWithAuth()
      .delete(`http://localhost:9000/api/articles/${article_id}`)
      .then((response) => {
        console.log(response.data);
        // Handle success, possibly update the articles state or show a success message
        setMessage('Article deleted successfully');
        setSpinnerOn(false); // Turn off the spinner
        // You may want to fetch articles again after deletion
        getArticles();
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          // Token might have gone bad, redirect to login
          redirectToLogin();
        } else {
          setMessage('Error deleting article'); // Set an error message
          setSpinnerOn(false); // Turn off the spinner
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
                <ArticleForm postArticle={postArticle}
                updateArticle={updateArticle}
                setCurrentArticleId={setCurrentArticleId}
                getArticles={getArticles}

                />
                <Articles
                  articles={articles}
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
