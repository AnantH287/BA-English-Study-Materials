import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Cacophony_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForTheLamb = [
                {
                    id: 1,
                    question: "Who is the author of The Lamb?",
                    options: ["William Blake", "William Wordsworth", "John Milton", "Edmund Spenser"],
                    correctAnswer: "William Blake"
                },
                {
                    id: 2,
                    question: "In which collection of poems does The Lamb appear?",
                    options: [
                        "Songs of Experience",
                        "Songs of Innocence",
                        "Lyrical Ballads",
                        "Paradise Lost"
                    ],
                    correctAnswer: "Songs of Innocence"
                },
                {
                    id: 3,
                    question: "What does the lamb symbolize in the poem?",
                    options: [
                        "Innocence and purity",
                        "Strength and courage",
                        "Wisdom and knowledge",
                        "Freedom and power"
                    ],
                    correctAnswer: "Innocence and purity"
                },
                {
                    id: 4,
                    question: "How is the creator described in The Lamb?",
                    options: [
                        "As a powerful ruler",
                        "As a loving and gentle figure",
                        "As an indifferent being",
                        "As a harsh and vengeful god"
                    ],
                    correctAnswer: "As a loving and gentle figure"
                },
                {
                    id: 5,
                    question: "What literary device is predominantly used in The Lamb?",
                    options: ["Alliteration", "Metaphor", "Personification", "Repetition"],
                    correctAnswer: "Repetition"
                },
                {
                    id: 6,
                    question: "What is the tone of The Lamb?",
                    options: ["Celebratory", "Gentle and peaceful", "Melancholic", "Angry"],
                    correctAnswer: "Gentle and peaceful"
                },
                {
                    id: 7,
                    question: "Which lines in the poem emphasize the innocence of the lamb?",
                    options: [
                        "'Little Lamb, who made thee?'",
                        "'He is meek, and He is mild.'",
                        "'I a child, and thou a lamb.'",
                        "'Dost thou know who made thee?'"
                    ],
                    correctAnswer: "'He is meek, and He is mild.'"
                },
                {
                    id: 8,
                    question: "What form does The Lamb follow?",
                    options: ["Sonnet", "Lyric poem", "Narrative poem", "Ode"],
                    correctAnswer: "Lyric poem"
                },
                {
                    id: 9,
                    question: "The Lamb is often paired with which poem from Songs of Experience?",
                    options: ["The Tiger", "The Chimney Sweeper", "London", "The Sick Rose"],
                    correctAnswer: "The Tiger"
                },
                {
                    id: 10,
                    question: "What does the repetition of the question 'Little Lamb, who made thee?' signify?",
                    options: [
                        "Doubt about the creator",
                        "A meditation on divine creation",
                        "An accusation against the lamb",
                        "A playful inquiry to the lamb"
                    ],
                    correctAnswer: "A meditation on divine creation"
                }
            ];
            
            
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='the_lamb';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForTheLamb.forEach((question)=>{
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
                <h1 className="quiz-title">The Lamb</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForTheLamb.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForTheLamb.length}</h2>}
                </div>
  )
}

export default Cacophony_test