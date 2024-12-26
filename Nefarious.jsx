import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import '../first_sem/All.css';
import imag1 from '../first_sem/images/article-1.jpeg';
import imag2 from '../first_sem/images/article-2.jpeg';
import imag3 from '../first_sem/images/article-3.jpeg';
import imag4 from '../first_sem/images/article-4.jpeg';
import Navbar from '../../main/Vertical';
import Footer from '../../main/Footer';
import Footer_two from '../../main/Footer_two';
import { useNavigate } from 'react-router-dom';

 const Nefarious = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('tamil');
  const [bookmark,setBookMark]=useState(false);

  const navigate=useNavigate();

  const Navigate_page=()=>{
    navigate('/article_test')
    }

  const handleVideoToggle = (videoType) => {
  setSelectedVideo(videoType);
  };

  const userId= localStorage.getItem('userId');
  const subjectId=22;
  
  useEffect(() => {
  
    axios
      .get('http://localhost:3000/literature/22')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setError('No data found');
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const videoUrl = selectedVideo === 'tamil' ? data?.tamil_vedio : data?.english_vedio;
  const fullVideoUrl = `http://localhost:3000/uploads/${videoUrl}`;

const handleBookMark=(e)=>{
  e.preventDefault();
  console.log('Bookmark button clicked');
  
    setBookMark((preBookMark)=>{
    const newBookmarkStatus=!preBookMark;
    console.log("This the current bookmark status",newBookmarkStatus);
    
    const values={userId,subjectId};
   
    if(newBookmarkStatus){

      axios.post('http://localhost:3000/literature/bookmark',values)
      .then((response)=>{
      console.log("Bookmark added",response);
      alert('Dear student,successfully booked your subject')
      setError(null) 
       })
      .catch((err)=>{
      console.log("cant send the userId and subjectId to backend"+err.message);
      setError("Oops! Couldn't save your bookmark. Please try again.")      
      })
    } else {
      console.log('I am false checker'+newBookmarkStatus);
   
      axios.post('http://localhost:3000/literature/cancel-bookmark',values)
     .then((response)=>{
      console.log("Bookmark canceled",response);    
      alert('Dear student,successfully canceled your subject  bookmark')
      setError(null);    
    })
      .catch((err)=>{
      console.log("can't cancel the bookmark"+err.message);
      setError("Oops! Couldn't save your bookmark. Please try again.")
      });
    } 
    return newBookmarkStatus;
  })
}
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div className='container'>
          <div>
            <Navbar />
          </div>
          <div className="video-player">
            <ReactPlayer url={fullVideoUrl} controls={true} width="100%" height="300px" />
          </div>

          <div className="button-group">
            <button
              className={selectedVideo === 'tamil' ? 'active' : ''}
              onClick={() => handleVideoToggle('tamil')}
            >
              Tamil Video
            </button>
            <button
              className={selectedVideo === 'english' ? 'active' : ''}
              onClick={() => handleVideoToggle('english')}
            >
              English Video
            </button>
          </div>

          <h1 className="title">{data.title}</h1>

          <div className="author-info">
            <img src={imag1} alt="Author" />
            <h3>{data.author_name}</h3>
          </div>
          <div className='slade'>
            <img src={imag2} alt="" />
            <img src={imag3} alt="" />
            <img src={imag4} alt="" />
            <img src={imag1} alt="" />
          </div>
          <h1 className='summary'>Summary:</h1>
  
          <p className="content">{data.content}</p>

          <div className='test_your_knowledge'>
            <button onClick={()=>Navigate_page()}>Test Your Knowledge ?</button>
          </div>

          <div className="literary-facts">
            <h2>Did You Know?</h2>
            <ul>
              <li>Shakespeare introduced over 1,700 words to the English language.</li>
              <li>Many of his plays were performed at the Globe Theatre in London.</li>
              <li>The line "To be, or not to be" is one of the most quoted phrases in literature.</li>
            </ul>
          </div>

          <div className="quote-of-the-day">
            <h2>Quote of the Day</h2>
            <p>"All the world's a stage, and all the men and women merely players."</p>
            <p>– William Shakespeare</p>
          </div>

          <div className="character-highlight">
            <h2>Character Spotlight: Hamlet</h2>
            <p>
              Hamlet, the Prince of Denmark, is one of Shakespeare's most complex characters. Torn
              between duty and emotion, he represents the eternal struggle of the human condition.
            </p>
          </div>

          <div className="poetic-style">
            <h2>Poetic Style</h2>
            <p>
              Shakespeare's writing is renowned for its use of iambic pentameter, where each line
              contains ten syllables in an alternating unstressed-stressed rhythm. This rhythm gives
              his works a lyrical and dramatic quality.
            </p>
          </div>

          <div className="reflection">
            <h2>Your Reflection</h2>
            <p>If you were Hamlet, how would you deal with the challenges he faces? Share your thoughts!</p>
          </div>
        </div>
      ) : (
        <p>
                    <div class="loader-container">
    <div class="bouncing-ball"></div>
  </div>
  
        </p>
      )}
<div className="bookmark-container">
  <button className='bookmark-symbol' onClick={handleBookMark}></button>
</div>
      <Footer_two/>
    </div>
  );
};

export default Nefarious;
