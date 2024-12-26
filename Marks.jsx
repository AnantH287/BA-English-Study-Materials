import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Marks.css';
import { useNavigate } from 'react-router-dom';

const Marks = () => {
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const userId = localStorage.getItem('userId');
    const navigate=useNavigate();

 
 
    const backHandler=()=>{
        navigate('/user')
    }


    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/literature/marks/${userId}`)
                .then((response) => {
                    console.log("Successfully fetched marks for student");
                    setMarks(response.data.result);
                    setLoading(false); 
                })
                .catch((err) => {
                    console.log("Cannot fetch marks for student");
                    setError("Error: " + err.message);
                    setLoading(false); 
                });
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="bouncing-balls">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div className="marks-container">
            {error && <p className="error-message">{error}</p>}
            <h1 className="section-title">Marks Section</h1>

            <div className="marks-grid">
                {marks.map((mark) => (
                    <>
                        <div className="marks-card">
                            <p>Prothalamion: <strong>{mark.prothalamion ? mark.prothalamion : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>On His Blindness: <strong>{mark.on_his_blindness ? mark.on_his_blindness : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>The Lamb: <strong>{mark.the_lamb ? mark.the_lamb : 'Take Test'}</strong></p>
                        </div>

                        <div className="marks-card">
                            <p>Shakespeare's England: <strong>{mark.shakespeare_england ? mark.shakespeare_england : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>Age of Caxton: <strong>{mark.age_of_caxon ? mark.age_of_caxon : 'Take Test'}</strong></p>
                        </div>

                        <div className="marks-card">
                            <p>Tragedy & Comedy: <strong>{mark.tragedy_comedy ? mark.tragedy_comedy : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>The Heroic Couplet: <strong>{mark.the_heroic_couplet ? mark.the_heroic_couplet : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>Edward Two: <strong>{mark.edward_two ? mark.edward_two : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>All for Love: <strong>{mark.all_for_love ? mark.all_for_love : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>Murder in the Cathedral: <strong>{mark.murder_in_the_cathedral ? mark.murder_in_the_cathedral : 'Take Test'}</strong></p>
                        </div>

                        <div className="marks-card">
                            <p>The Age Of Elizabeth: <strong>{mark.age_of_elizabeth ? mark.age_of_elizabeth : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>The Age Of Chaucer: <strong>{mark.age_of_chaucer ? mark.age_of_chaucer : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>The Victorian Age: <strong>{mark.the_victorian_age ? mark.the_victorian_age : 'Take Test'}</strong></p>
                        </div>

                        <div className="marks-card">
                            <p>Article: <strong>{mark.article ? mark.article : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>Adverbs: <strong>{mark.adverbs ? mark.adverbs : 'Take Test'}</strong></p>
                        </div>
                        <div className="marks-card">
                            <p>Letter Writing: <strong>{mark.letter_writing ? mark.letter_writing : 'Take Test'}</strong></p>
                        </div>
                    </>
                ))}
            </div>
                    <div title='button'>
                        <button onClick={backHandler}>
                        Go Back
                        </button>
                    </div>
            <div className="quote-section">
                <p>Marks don't define you. It's just a quiz!</p>
            </div>
        </div>
    );
};

export default Marks;
