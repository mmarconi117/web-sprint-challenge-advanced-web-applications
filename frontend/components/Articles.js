import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PT from 'prop-types';



export default function Articles(props) {
  const {
    articles,
    getArticles,
    deleteArticle,
    setCurrentArticleId,
    currentArticleId,
  } = props;
  // ✨ Destructure the props here

  // ✨ Implement conditional logic: if no token exists
  // we should render a Navigate to the login screen (React Router v.6)
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    // ✨ Grab the articles here, on first render only
    getArticles();
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>
      {!props.articles.length ? (
        <p>No articles yet</p>
      ) : (
        props.articles.map((art) => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button
                disabled={currentArticleId === art.article_id}
                onClick={() => setCurrentArticleId(art.article_id)}
              >
                Edit
              </button>
              <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

}

// 🔥 No touchy: Articles expects the following props exactly:
// Articles.propTypes = {
//   articles: PT.arrayOf(
//     PT.shape({
//       article_id: PT.number.isRequired,
//       title: PT.string.isRequired,
//       text: PT.string.isRequired,
//       topic: PT.string.isRequired,
//     })
//   ).isRequired,
//   getArticles: PT.func.isRequired,
//   deleteArticle: PT.func.isRequired,
//   setCurrentArticleId: PT.func.isRequired,
//   currentArticleId: PT.number, // can be undefined or null
// };
