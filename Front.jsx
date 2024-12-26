import React from 'react';
import css from './Front.css';
import { useNavigate } from 'react-router-dom';
import image1 from './images/shakespeare.webp'
import image2 from './images/book.webp'
import milton from './images/jhonmilton.jpeg'
import blake from './images/williamblake.jpeg'
import dryden from './images/jhondryden.jpeg'
import eliot from './images/ts.jpeg'
import edmund from './images/edmund.jpeg'
import george from './images/george.jpeg'
import shakes from './images/shakes.jpeg'
import marlowe from './images/christ.jpeg'
import Footer from '../main/Footer';



const Front = () => {

  const navigate = useNavigate(); 

  const courses = [
    {
      image: milton,
      name: "John Milton",
      title: "On His Blindness",
      duration: "15-25 mins",
      learners: "12,344",
      redirect: "/on-his-blindness",
      details: [
        "Themes of faith and patienceAnalysis of poetic structureMilton's personal struggles reflected in poetry",
      ],
    },
    {
      image: blake,
      name: "William Blake",
      title: "The Lamb",
      duration: "10-15 mins",
      learners: "8,245",
      redirect: "/the-lamb", 
      details: [
        "Symbolism in Blake's poetryThemes of innocence and spirituality Connection Innocence and Experience",
      ],
    },
    {
      image: marlowe,
      name: "Christopher Marlowe",
      title: "Edward II",
      duration: "25-35 mins",
      learners: "6,452",
      redirect: "/edward-ii",
      details: [
        "Historical and political themes Marlowe's portrayal of power  techniques in Elizabethan drama",
      ],
    },
    {
      image: dryden,
      name: "John Dryden",
      title: "All for Love",
      duration: "20-30 mins",
      learners: "9,876",
      redirect: "/all-for-love",
      details: [
        "Themes of love and tragedy Dryden's adaptation of Antony and Cleopatra Classical influences in Dryden's works",
      ],
    },
    {
      image: eliot,
      name: "T.S. Eliot",
      title: "Murder in the Cathedral",
      duration: "30-40 mins",
      learners: "7,531",
      redirect: "/murder-in-the-cathedral",
      details: [
        "Religious themes in modern drama Eliot's poetic style in a dramatic context Analysis of martyrdom and sacrifice",
      ],
    },
    {
      image: edmund,
      name: "Edmund Spenser",
      title: "Prothalamion",
      duration: "30-40 mins",
      learners: "7,535",
      redirect: "/prothalamion",
      details: [
        "Religious themes in modern drama Eliot's poetic style in a dramatic context Analysis of martyrdom and sacrifice",
      ],
    },
    {
      image: shakes,
      name: "William Shakespeare",
      title: "Macbeth,",
      duration: "30-40 mins",
      learners: "7,535",
      redirect: "/prothalamion",
      details: [
        "Themes of faith and patienceAnalysis of poetic structureMilton's personal struggles reflected in poetry",
      ],
    },  {
      image: george,
      name: "George Orwell",
      title: "Animal Farm",
      duration: "30-40 mins",
      learners: "7,535",
      redirect: "/prothalamion",
      details: [
        "Religious themes in modern drama Eliot's poetic style in a dramatic context Analysis of martyrdom and sacrifice",
      ],
    },
  ];
  return (
    <div>
        <div className='image'>
            <img src={image1} alt="" />
            <div className='we'>
    <h1>We are Shakespeare's Children</h1>
  </div>
            <p className='para'>
<span>English literature</span>, the body of written works produced in the English language by inhabitants of the British Isles (including Ireland) from the 7th century to the present day. The major literatures written in English outside the British Isles are treated separately under American literature, Australian literature, Canadian literature, and New Zealand literature.

English literature has sometimes been stigmatized as insular. It can be argued that no single English novel attains the universality of the Russian writer Leo Tolstoy’s War and Peace or the French writer Gustave Flaubert’s Madame Bovary. Yet in the Middle Ages the Old English literature of the subjugated Saxons was leavened by the Latin and Anglo-Norman writings, eminently foreign in origin, in which the churchmen and the Norman conquerors expressed themselves. From this combination emerged a flexible and subtle linguistic instrument exploited by Geoffrey Chaucer and brought to supreme application by William Shakespeare. During the Renaissance the renewed interest in Classical learning and values had an important effect on English literature, as on all the arts; and ideas of Augustan literary propriety in the 18th century and reverence in the 19th century for a less specific, though still selectively viewed, Classical antiquity continued to shape the literature. All three of these impulses derived from a foreign source, namely the Mediterranean basin. The Decadents of the late 19th century and the Modernists of the early 20th looked to continental European individuals and movements for inspiration. Nor was attraction toward European intellectualism dead in the late 20th century, for by the mid-1980s the approach known as structuralism, a phenomenon predominantly French and German in origin, infused the very study of English literature itself in a host of published critical studies and university departments. Additional influence was exercised by deconstructionist analysis, based largely on the work of French philosopher Jacques Derrida.

Further, Britain’s past imperial activities around the globe continued to inspire literature—in some cases wistful, in other cases hostile. Finally, English literature has enjoyed a certain diffusion abroad.

   </p>
            <img src={image2} alt="" className='book'/>
        </div>
      
      <div className='why' >
          <h1>Why Study BA English Honors</h1>
         <h3>Studying English Honours offers many benefits and opportunities for personal, academic, and professional growth. Here are several reasons why students might choose to pursue  <center>English Honours degree</center>  </h3>
          <h6>Deep understanding of language and literature</h6> <p> <li>Engaging with diverse texts fosters insight into linguistic nuances and literary techniques, enriching comprehension and appreciation of the written word.</li></p>
          <h6>Improved communication skills</h6>  <p><li>Analyzing complex texts and articulating interpretations hones both written and verbal communication abilities, essential for effective expression in various personal and professional contexts.</li></p>
         <h6>Cultural and historical awareness</h6> <p><li>Exploring literature from different cultures and historical periods cultivates empathy and understanding of diverse perspectives, contributing to a broader worldview and cultural sensitivity.
         </li> </p>
      </div>
    
    
      <div className='courses-section'>
        {courses.map((course, index) => (
          <div className='course-card' key={index}>
            <img src={course.image} alt={course.name} className='course-image' />
            <div className='course-info'>
              <h3>{course.name}</h3>
              <p className='category'>{course.title}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Learners:</strong> {course.learners}</p>
               
              <div className='course-details'>
                <ul >
                  {course.details.map((detail, i) => (
                    <li key={i}>{detail} 
                    <button onClick={() => navigate(course.redirect)}>More Details</button> 
                    </li>
                    
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Front