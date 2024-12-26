import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Melancholy_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForVictorianAge = [
                {
                    id: 1,
                    question: "Who was the reigning monarch during the Victorian Age?",
                    options: [
                        "Queen Victoria",
                        "Queen Elizabeth I",
                        "Queen Anne",
                        "Queen Mary"
                    ],
                    correctAnswer: "Queen Victoria"
                },
                {
                    id: 2,
                    question: "What are the approximate years of the Victorian Age?",
                    options: [
                        "1837–1901",
                        "1789–1820",
                        "1901–1945",
                        "1700–1750"
                    ],
                    correctAnswer: "1837–1901"
                },
                {
                    id: 3,
                    question: "Which social issue was a dominant theme in Victorian literature?",
                    options: [
                        "Industrialization and its impact on society",
                        "Colonial expansion and global trade",
                        "Revolutions and uprisings",
                        "Medieval chivalry"
                    ],
                    correctAnswer: "Industrialization and its impact on society"
                },
                {
                    id: 4,
                    question: "Which literary form flourished during the Victorian Age?",
                    options: [
                        "The novel",
                        "Epic poetry",
                        "Short stories",
                        "Dramatic monologues"
                    ],
                    correctAnswer: "The novel"
                },
                {
                    id: 5,
                    question: "Which of the following is a prominent Victorian novelist?",
                    options: [
                        "Charles Dickens",
                        "Geoffrey Chaucer",
                        "Alexander Pope",
                        "John Keats"
                    ],
                    correctAnswer: "Charles Dickens"
                },
                {
                    id: 6,
                    question: "What was a characteristic feature of Victorian society?",
                    options: [
                        "Strict moral codes",
                        "Religious skepticism",
                        "Complete social equality",
                        "Anarchist movements"
                    ],
                    correctAnswer: "Strict moral codes"
                },
                {
                    id: 7,
                    question: "Which Victorian writer is known for novels like 'Jane Eyre'?",
                    options: [
                        "Charlotte Brontë",
                        "Virginia Woolf",
                        "Elizabeth Barrett Browning",
                        "George Eliot"
                    ],
                    correctAnswer: "Charlotte Brontë"
                },
                {
                    id: 8,
                    question: "Which movement critiqued the industrial and social changes of the Victorian Age?",
                    options: [
                        "The Pre-Raphaelite Brotherhood",
                        "Romanticism",
                        "Modernism",
                        "The Age of Enlightenment"
                    ],
                    correctAnswer: "The Pre-Raphaelite Brotherhood"
                },
                {
                    id: 9,
                    question: "What was the role of women in Victorian literature often portrayed as?",
                    options: [
                        "Confined to domestic and subordinate roles",
                        "As equal partners in all aspects of life",
                        "Primarily as warriors and leaders",
                        "As independent industrialists"
                    ],
                    correctAnswer: "Confined to domestic and subordinate roles"
                },
                {
                    id: 10,
                    question: "Which theme was prevalent in Victorian poetry?",
                    options: [
                        "Conflict between faith and doubt",
                        "Celebration of nature's beauty",
                        "Rebellion against monarchy",
                        "Mysticism and prophecy"
                    ],
                    correctAnswer: "Conflict between faith and doubt"
                }
            ];
            

                           
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='the_victorian_age';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForVictorianAge.forEach((question)=>{
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
                <h1 className="quiz-title">The Victorian Age</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForVictorianAge.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForVictorianAge.length}</h2>}
                </div>
  )
}

export default Melancholy_test
