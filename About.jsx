import React from "react";
import "./About.css";
import image from "./images/study.avif";
import study from "./images/boy.jpg";
import study1 from "./images/girl.jpg";
import liter from "./images/liter.jpg";
import critic from "./images/nature.jpg";
import Nav from "./Nav";
import Footer from "./Footer";
const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        Welcome to{" "}
        <strong>The Art of Words: A Journey Through English Literature</strong>,
        where the timeless beauty of English literature comes alive! We aim to
        make literature accessible, engaging, and inspiring for everyone.
      </p>

      <div className="about-section">
        <img src={image} alt="Vision" className="about-image" />
        <div className="about-content">
          <h2>Our Vision</h2>
          <p>
            To ignite a love for literature that transcends boundaries, fosters
            critical thinking, and deepens understanding of the human
            experience. Through the exploration of diverse literary works, we
            aim to cultivate an appreciation for storytelling as an art form and
            a reflection of culture and society.
          </p>
          <p>
            Our vision is to empower students to connect with timeless
            narratives, analyze complex themes, and express their own
            perspectives creatively. By bridging the past and present, we strive
            to highlight the relevance of literature in shaping identity and
            encouraging empathy.
          </p>
          <p>
            We believe in creating a platform where learning becomes an engaging
            journey, blending modern educational tools with classical texts. Our
            goal is to inspire individuals to not only excel academically but
            also to carry forward the transformative power of literature in
            their personal and professional lives.
          </p>
        </div>
      </div>

      <div className="about-section reverse">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide resources, insights, and tools that help
            students and readers navigate the rich tapestry of English
            literature. We strive to make literature accessible, relatable, and
            engaging for all, fostering a deeper connection to the written word.
          </p>
          <p>
            By offering comprehensive study materials, thought-provoking
            analyses, and creative learning methods, we aim to empower students
            to explore diverse literary traditions and genres. Our mission is to
            illuminate the cultural, historical, and philosophical contexts that
            shape literary works, enriching the learning experience.
          </p>
          <p>
            We are committed to supporting readers in developing critical
            thinking, analytical skills, and an appreciation for the profound
            impact of literature on society. Through this journey, we aspire to
            nurture a lifelong love for reading and learning that transcends the
            classroom.
          </p>
        </div>
        <img src={study} alt="Mission" className="about-image" />
      </div>

      <div className="about-gallery">
        <h2>Gallery</h2>
        <div className="gallery-images">
          <img src={liter} alt="Classic Literature" className="gallery-image" />
          <img src={critic} alt="Modern Literature" className="gallery-image" />
          <img src={study1} alt="Analysis" className="gallery-image-last" />
        </div>
      </div>

      <h2 className="join-title">Join Us on This Literary Journey</h2>
      <p className="join-text">
        Explore, learn, and celebrate the magic of English literature with us.
        Together, let's unlock the stories that shape our world.
      </p>
      <Footer />
    </div>
  );
};

export default About;
