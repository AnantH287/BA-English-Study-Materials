import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './Student.css'; 
import { useNavigate } from "react-router-dom";
import { iAmSender } from "../../jwt/Login";
import nobita from './nobita.jpg';
import BookMarksPage from "./BookMarksPage";
import Aesthetic from "../users/first_sem/Aesthetic";
import Benevolent from "../users/first_sem/Benevolent";
import Cacophony from "../users/first_sem/Cacophony";
import Diligent from "../users/first_sem/Diligent";
import Ephemeral from "../users/first_sem/Ephemeral";
import Felicity from "../users/first_sem/Felicity";
import Gregarious from "../users/first_sem/Gregarious";

const Student = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigator = useNavigate();
  
 const userId=localStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/literature/getuser/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data.result) && response.data.result.length > 0) {
            const userData=(response.data.result[0]);
            setUser(userData);
            localStorage.setItem('user.username', userData.username);  
          } else {
            setError('User data not found');
          }
        })
        .catch((err) => {
          const errorMessage = `Error: ${err.response?.data?.message || err.message}`;
          setError(errorMessage);
          console.error(errorMessage);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user.username')

    navigator('/login'); 
  };
const bookMarks=()=>{
  navigator('/bookmarkpage')
}
const trackMarks=()=>{
  navigator('/marks')
}
  if (user === null) {
    return (
      <div className="loading-container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    );
  }
  console.log(user);  

  return (
    <div className="user-page">
      {error && <div className="error-message">{error}</div>}

      <div className="profile-container">
        <div className="profile-header">
          <h1>{user?.username}'s Profile</h1>
          <p>Student ID: {userId}</p>
        </div>

        <div className="profile-info">
          <div className="profile-picture">
            <img
              src={nobita || "/path-to-default-image/default.png"}
              alt="Profile"
              className="user-image"
            />
          </div>

          <div className="personal-info">
            <p><strong>Email:</strong> {user?.email || 'Email not available'}</p>
          </div>
        </div>

        <div className="activities-section">
          <ul>
            <button onClick={bookMarks} className="logout-btn">Get your bookmarks</button>
            <button onClick={trackMarks} className="logout-btn">Track your marks</button>
          </ul>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Student;
