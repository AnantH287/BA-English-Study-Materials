import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './BookMarkPage.css';
import { useNavigate } from 'react-router-dom';

const BookMarksPage = () => {
  const [bookmarks, setBookMarks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  
  const userId = localStorage.getItem('userId');
  const navigate=useNavigate();

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/literature/getallbookmarks/${userId}`)
        .then((response) => {
          setBookMarks(response.data.result);
          setLoading(false);  
        })
        .catch((err) => {
          setError("Can't show bookmarks for students", err.message);
          setLoading(false);  
        });
    }
  }, [userId]);
  
  const handleGoBack = () => {
    navigate('/user'); 
  };
  return (
    <div className="bookmarks-container">
      {loading ? (
        <div className="loading-container">
          <div className="bouncing-ball"></div>
          <p>Loading your bookmarks...</p>
        </div>
      ) : (
        <>
          {error && <p className="error-message">Error: {error}</p>}
          <h1>Your Bookmarks List</h1>
          <p className="technical-issue-message">
            Sorry, student. Some technical issues prevent us from providing videos.
            I believe you're doing well!
          </p>
          <ul>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.bookmarkId}>
                <h3 className="title">{bookmark.title}</h3>
                <p className="author">Author: {bookmark.author_name}</p>
                <p className="content">{bookmark.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
            <button onClick={handleGoBack} className="back-button">Back to Student Page</button>
    </div>
  );
};

export default BookMarksPage;
