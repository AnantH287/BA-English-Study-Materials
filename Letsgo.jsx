import React from "react";
import './Letsgo.css'
import Navbar from "./Vertical";
import img1 from "./images/graduate.jpg";
import img2 from "./images/study.avif";
import img3 from "./images/mativate.jpeg";
import Footer from "./Footer";
import Footer_two from "./Footer_two";

const Letsgo = () => {
  return (
    <div className="letsgo-container">
      <Navbar />
      <div className="content">
        <div className="main-image">
          <img src={img1} alt="Graduation" className="img_one" />
          <h1 className="center-text">"Every Step Matters, Every Dream Counts!"</h1>
        </div>

        <div className="text-section">
          <h2>🌟 Believe in Yourself</h2>
          <p>
            Success is not the key to happiness. Happiness is the key to success. 
            If you love what you are doing, you will be successful. Every small step 
            you take brings you closer to your dreams.
          </p>

          <h2>📚 Tools for Excellence</h2>
          <p>
            Explore rich resources like videos and essays designed to make your 
            learning journey easier. Embrace clarity and simplicity in every subject.
          </p>

          <h2>💡 Keep Moving Forward</h2>
          <p>
            Remember, the difference between who you are and who you want to be 
            is what you do. Stay determined, stay motivated, and conquer your goals.
          </p>
        </div>

        <div className="bottom-images">
          <div className="image-box">
            <img src={img2} alt="Study" className="img_two" />
            <p>📚 Unlock endless knowledge with video + essays!</p>
          </div>
          <div className="image-box">
            <img src={img3} alt="Motivation" className="img_three" />
            <p>💡 Simplify learning with clear, concise resources!</p>
          </div>
        </div>
      </div>

      <footer className="footers">
        <p>✨ *"Stay motivated, stay dedicated—your future awaits!"*</p>
      </footer>
    <Footer_two />

    </div>
  );
};

export default Letsgo;
