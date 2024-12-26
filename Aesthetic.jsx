import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './All.css';
import edmund1 from './images/edmund-1.jpeg';
import edmund2 from './images/edmund-2.jpeg';
import edmund3 from './images/edmund-3.jpeg';
import edmund4 from './images/edmund-4.jpeg';
import Navbar from '../../main/Vertical';
import Footer from '../../main/Footer';
import Footer_two from '../../main/Footer_two';
import { useNavigate } from 'react-router-dom';

const Aesthetic = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('tamil');
  const [bookmark,setBookMark]=useState(false);
  const [loading,setLoading]=useState(true);
  const username=localStorage.getItem('user.username')

  const navigate=useNavigate();

  const Navigate_page=()=>{
    if(username){
      navigate('/Aesthetic_test')
    } else {
      alert('Student Kindly Login')
    }

  }

  const handleVideoToggle = (videoType) => {
  setSelectedVideo(videoType);
  };

  const userId= localStorage.getItem('userId');
  const subjectId=9;
  
  useEffect(() => {
  
    axios
      .get('http://localhost:3000/literature/9')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
          setLoading(false)
        } else {
          setError('No data found')
          setLoading(false)
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
  if(username){
    setBookMark((preBookMark)=>{
      const newBookmarkStatus=!preBookMark;
      console.log("This the current bookmark status",newBookmarkStatus);
      
      const values={userId,subjectId};
     
      if(newBookmarkStatus){
  
        console.log('I am true checker'+newBookmarkStatus);
     
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
  } else {
    alert("Dear Student Please Login")
  }
    
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
            <img src={edmund1} alt="Author" />
            <h3>{data.author_name}</h3>
          </div>
          <div className='slade'>
            <img src={edmund4} alt="" />
            <img src={edmund2} alt="" />
            <img src={edmund3} alt="" />
            <img src={edmund1} alt="" />
          </div>
          <h1 className='summary'>Summary:</h1>
          <p className="content">{data.content}</p>

          <div className='test_your_knowledge'>
            <button onClick={()=>Navigate_page()}>Test Your Knowledge ?</button>
          </div>

          <div className="literary-facts">
            <h2>Did You Know?</h2>
            <ul>
              <li>Born: Likely in London, England, around 1552 or 1553.</li>
              <li>Education: Spenser was educated at the Merchant Taylors' School in London .</li>
              <li>Influence: At Cambridge, he became deeply influenced by classical literature and Renaissance humanism.</li>
            </ul>
          </div>

          <div className="quote-of-the-day">
            <h2>Quote of the Day</h2>
            <p>“Beauty is the bait which with delight doth man’s soul entice to enlarge his kind.”</p>
            <p>Edmund Spenser</p>
          </div>

          <div className="character-highlight">
            <h2>Character Spotlight: Prothalamion</h2>
            <p>
          Edmund Spenser's "Prothalamion" is a marriage ode celebrating the weddings of the Earl of Worcester's two daughters. While it is more symbolic and thematic than character-driven, the following are the key figures and symbolic entities in the poem:           
           </p>
          </div>

          <div className="poetic-style">
            <h2>Poetic Style</h2>
            <p>
            Edmund Spenser's poetic style in "Prothalamion" is lyrical and refined, characterized by its harmonious flow and vivid imagery. He masterfully combines themes of nature and love, creating a celebratory and serene tone throughout the poem.  
            </p>
          </div>

          <div className="reflection">
            <h2>Your Reflection</h2>
            <p>
            If you were crafting a poetic celebration like Spenser, how would you express themes of love and harmony? Share your thoughts!
            </p>
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

export default Aesthetic;
