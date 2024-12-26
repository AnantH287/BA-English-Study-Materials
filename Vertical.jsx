import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Vertical.css";
import { FaHome} from 'react-icons/fa'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    
    <div className="vertical-navbar">
      <div className="home">
        <Link to={'/'} className='nav-logo'><FaHome className='fa-times'></FaHome></Link>
      </div>
      {/* First Semester */}
      <div className="fortitlemargin">
      <h3 className="navbar-title">First Semester</h3>
      </div>
      <div className="formargin">     
      <div>
        <div className="nav-heading" onClick={() => toggleDropdown("poetry")}>
          British Poetry
          <span className="dropdown-icon">
            {openDropdown === "poetry" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "poetry" && (
          <div className="dropdown">
            <Link to="/prothalamion">Prothalamion</Link>
            <Link to="/on-his-blindness">On His Blindness</Link>
            <Link to="/the-lamb">The Lamb</Link>
          </div>
        )}
      </div>

      <div>
        <div className="nav-heading" onClick={() => toggleDropdown("history")}>
          Social History of England
          <span className="dropdown-icon">
            {openDropdown === "history" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "history" && (
          <div className="dropdown">
            <Link to="/shakespeare-england">Shakespeare England</Link>
            <Link to="/caxton">England in Two Ages of Caxton</Link>
          </div>
        )}
      </div>

      <div>
        <div className="nav-heading" onClick={() => toggleDropdown("forms")}>
          Literary Forms
          <span className="dropdown-icon">
            {openDropdown === "forms" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "forms" && (
          <div className="dropdown">
            <Link to="/tragedy-comedy">Tragedy-Comedy</Link>
            <Link to="/heroic-couplet">The Heroic Couple</Link>
          </div>
        )}
      </div>
  </div>


      {/* Second Semester */}
      <h3 className="navbar-title">Second Semester</h3>

      <div>
        <div
          className="nav-heading"
          onClick={() => toggleDropdown("drama")}
        >
          British Drama
          <span className="dropdown-icon">
            {openDropdown === "drama" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "drama" && (
          <div className="dropdown">
            <Link to="/edward-ii">Edward II</Link>
            <Link to="/all-for-love">All for Love</Link>
            <Link to="/murder-in-the-cathedral">Murder in the Cathedral</Link>
          </div>
        )}
      </div>

      <div>
        <div
          className="nav-heading"
          onClick={() => toggleDropdown("litHistory")}
        >
          History of English Literature
          <span className="dropdown-icon">
            {openDropdown === "litHistory" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "litHistory" && (
          <div className="dropdown">
            <Link to="/age-of-elizabeth">The Age of Elizabeth</Link>
            <Link to="/age-of-chaucer">The Age of Chaucer</Link>
            <Link to="/victorian-age">The Victorian Age</Link>
          </div>
        )}
      </div>

      <div>
        <div
          className="nav-heading"
          onClick={() => toggleDropdown("modernEnglish")}
        >
          Modern English
          <span className="dropdown-icon">
            {openDropdown === "modernEnglish" ? "▲" : "▼"}
          </span>
        </div>
        {openDropdown === "modernEnglish" && (
          <div className="dropdown">
            <Link to="/article">Article</Link>
            <Link to="/adverbs">Adverbs</Link>
            <Link to="/letter-writing">Letter Writing</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
