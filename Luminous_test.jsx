import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Luminous_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForAgeOfChaucer = [
                {
                    id: 1,
                    question: "Who is considered the 'Father of English Literature'?",
                    options: [
                        "Geoffrey Chaucer",
                        "William Shakespeare",
                        "John Milton",
                        "Edmund Spenser"
                    ],
                    correctAnswer: "Geoffrey Chaucer"
                },
                {
                    id: 2,
                    question: "Which major work is Geoffrey Chaucer best known for?",
                    options: [
                        "The Canterbury Tales",
                        "Paradise Lost",
                        "The Faerie Queene",
                        "Beowulf"
                    ],
                    correctAnswer: "The Canterbury Tales"
                },
                {
                    id: 3,
                    question: "What was the dominant social system during the Age of Chaucer?",
                    options: [
                        "Feudalism",
                        "Capitalism",
                        "Socialism",
                        "Democracy"
                    ],
                    correctAnswer: "Feudalism"
                },
                {
                    id: 4,
                    question: "Which event significantly impacted society during Chaucer's time?",
                    options: [
                        "The Black Death",
                        "The Spanish Armada",
                        "The Norman Conquest",
                        "The Industrial Revolution"
                    ],
                    correctAnswer: "The Black Death"
                },
                {
                    id: 5,
                    question: "What type of English did Chaucer primarily write in?",
                    options: [
                        "Middle English",
                        "Old English",
                        "Modern English",
                        "Early Modern English"
                    ],
                    correctAnswer: "Middle English"
                },
                {
                    id: 6,
                    question: "Which aspect of society is frequently depicted in 'The Canterbury Tales'?",
                    options: [
                        "A cross-section of medieval life and professions",
                        "The lives of kings and queens",
                        "Rural farming practices",
                        "The Industrial working class"
                    ],
                    correctAnswer: "A cross-section of medieval life and professions"
                },
                {
                    id: 7,
                    question: "What literary form is 'The Canterbury Tales' known for using?",
                    options: [
                        "Frame narrative",
                        "Epic poetry",
                        "Allegory",
                        "Tragedy"
                    ],
                    correctAnswer: "Frame narrative"
                },
                {
                    id: 8,
                    question: "Which social class gained prominence during Chaucer's time?",
                    options: [
                        "The emerging middle class",
                        "The aristocracy",
                        "The clergy",
                        "The peasant class"
                    ],
                    correctAnswer: "The emerging middle class"
                },
                {
                    id: 9,
                    question: "Which institution held significant power during the Age of Chaucer?",
                    options: [
                        "The Catholic Church",
                        "The Parliament",
                        "The Monarchy",
                        "The Guilds"
                    ],
                    correctAnswer: "The Catholic Church"
                },
                {
                    id: 10,
                    question: "What themes are commonly found in Chaucer's works?",
                    options: [
                        "Love, morality, and satire",
                        "Rebellion, industrialization, and science",
                        "Tragedy, heroism, and epic quests",
                        "Mysticism, prophecy, and spirituality"
                    ],
                    correctAnswer: "Love, morality, and satire"
                }
            ];
            

                        
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='age_of_chaucer';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForAgeOfChaucer.forEach((question)=>{
    if(userAnswers[question.id]==question.correctAnswer){
        calculateScore++;
    }
});

setScore(calculateScore);

            console.log("This is the userId",userId)
            console.log("This is the subjectId",subjectId)
            console.log("This is the Score",calculateScore)
            console.log("This is the fieldName",fieldname)

    axios.post("http://localhost:3000/literature/marks",{
        userId,
        subjectId,
        score:calculateScore,
        fieldname,
    })

    .then((response)=>alert("Successfully Completed Your Test Kindly Check Your Profile"))
    .catch((err)=>{
            setError(`Error: ${err.response ? err.response.data.message : err.message}`);
        console.log("Failed send userId,subjectId,score and fieldname to backend",err.message)
    })

}
    return (
    <div>
                {error && <p>Error is:{error}</p>}
                <h1 className="quiz-title">The Age Of Elizabeth</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForAgeOfChaucer.map((question)=>(
                        <div key={question.id} style={{marginBottom:"20px"}}>
                            <p>
                                <strong>Q{question.id}:{question.question}</strong>
                            </p>
                            {question.options.map((option)=>(
                                <div key={option}>
                                    <input type="radio" 
                                        name={`question-${question.id}`}
                                        id={`${question.id}-${option}`}
                                        value={option}
                                        onChange={()=>handleOptionChange(question.id,option)}
                                    />
                                    <label htmlFor={`${question.id}-${option}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                        <button type='submit'>Get Mark</button>
                </form>
                {score !== null && <h2>Your score: {score} / {questionsForAgeOfChaucer.length}</h2>}
                </div>
  )
}

export default Luminous_test
