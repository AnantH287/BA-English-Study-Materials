import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Kaleidoscope_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForAgeOfElizabeth = [
                {
                    id: 1,
                    question: "Who was the reigning monarch during the Elizabethan Age?",
                    options: [
                        "Queen Elizabeth I",
                        "King James I",
                        "Queen Mary I",
                        "King Henry VIII"
                    ],
                    correctAnswer: "Queen Elizabeth I"
                },
                {
                    id: 2,
                    question: "What is the Elizabethan Age often called?",
                    options: [
                        "The Golden Age of England",
                        "The Dark Ages",
                        "The Industrial Age",
                        "The Romantic Era"
                    ],
                    correctAnswer: "The Golden Age of England"
                },
                {
                    id: 3,
                    question: "Which of these was a prominent feature of the Elizabethan Age?",
                    options: [
                        "The flourishing of English drama",
                        "The rise of the Gothic novel",
                        "The spread of the printing press",
                        "The abolition of slavery"
                    ],
                    correctAnswer: "The flourishing of English drama"
                },
                {
                    id: 4,
                    question: "Who were the leading playwrights of the Elizabethan Age?",
                    options: [
                        "William Shakespeare and Christopher Marlowe",
                        "John Milton and Alexander Pope",
                        "Geoffrey Chaucer and Edmund Spenser",
                        "Oscar Wilde and George Bernard Shaw"
                    ],
                    correctAnswer: "William Shakespeare and Christopher Marlowe"
                },
                {
                    id: 5,
                    question: "Which major naval event occurred during the Elizabethan Age?",
                    options: [
                        "The defeat of the Spanish Armada",
                        "The Battle of Hastings",
                        "The War of the Roses",
                        "The signing of the Magna Carta"
                    ],
                    correctAnswer: "The defeat of the Spanish Armada"
                },
                {
                    id: 6,
                    question: "What was the dominant religion in Elizabethan England?",
                    options: [
                        "Protestantism",
                        "Catholicism",
                        "Puritanism",
                        "Anglicanism"
                    ],
                    correctAnswer: "Protestantism"
                },
                {
                    id: 7,
                    question: "What was the name of the famous theatre associated with the Elizabethan Age?",
                    options: [
                        "The Globe Theatre",
                        "The Royal Court Theatre",
                        "The Blackfriars Theatre",
                        "The Lyceum Theatre"
                    ],
                    correctAnswer: "The Globe Theatre"
                },
                {
                    id: 8,
                    question: "What was the focus of literature during the Elizabethan Age?",
                    options: [
                        "Humanism and the celebration of individuality",
                        "Scientific discovery and industrialization",
                        "Social reform and political critique",
                        "Mysticism and spiritual exploration"
                    ],
                    correctAnswer: "Humanism and the celebration of individuality"
                },
                {
                    id: 9,
                    question: "Which explorer is associated with the Elizabethan Age?",
                    options: [
                        "Sir Francis Drake",
                        "James Cook",
                        "Marco Polo",
                        "Christopher Columbus"
                    ],
                    correctAnswer: "Sir Francis Drake"
                },
                {
                    id: 10,
                    question: "What architectural style was prominent during the Elizabethan Age?",
                    options: [
                        "Elizabethan architecture",
                        "Baroque architecture",
                        "Gothic architecture",
                        "Neoclassical architecture"
                    ],
                    correctAnswer: "Elizabethan architecture"
                }
            ];
            
            
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='age_of_elizabeth';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForAgeOfElizabeth.forEach((question)=>{
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
                    {questionsForAgeOfElizabeth.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForAgeOfElizabeth.length}</h2>}
                </div>
  )
}

export default Kaleidoscope_test
