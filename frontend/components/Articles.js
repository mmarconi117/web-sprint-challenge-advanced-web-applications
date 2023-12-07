import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PT from 'prop-types';

export default function Articles({
  articles,
  getArticles,
  deleteArticle,
  setCurrentArticleId,
  currentArticleId,
}) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>
      {!articles.length ? (
        <p>No articles yet</p>
      ) : (
        articles.map((art) => (
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

Articles.propTypes = {
  articles: PT.arrayOf(
    PT.shape({
      article_id: PT.number.isRequired,
      title: PT.string.isRequired,
      text: PT.string.isRequired,
      topic: PT.string.isRequired,
    })
  ).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number,
};
