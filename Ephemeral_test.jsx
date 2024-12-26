import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Ephemeral_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForEnglandInTheAgeOfCaxton = [
                {
                    id: 1,
                    question: "Who is the author of England in the Age of Caxton?",
                    options: ["E.M.W. Tillyard", "William Caxton", "David Harris Sacks", "J. D. Mackie"],
                    correctAnswer: "J. D. Mackie"
                },
                {
                    id: 2,
                    question: "What is the central theme of England in the Age of Caxton?",
                    options: [
                        "The rise of printing and its impact on society",
                        "The personal life of William Caxton",
                        "The Tudor dynasty's reign",
                        "The industrial revolution"
                    ],
                    correctAnswer: "The rise of printing and its impact on society"
                },
                {
                    id: 3,
                    question: "Who was William Caxton?",
                    options: [
                        "The first English printer",
                        "A famous Tudor monarch",
                        "An explorer during the Renaissance",
                        "A playwright in Shakespeare's time"
                    ],
                    correctAnswer: "The first English printer"
                },
                {
                    id: 4,
                    question: "What technological advancement is central to the book's narrative?",
                    options: [
                        "The printing press",
                        "The steam engine",
                        "The compass",
                        "The telescope"
                    ],
                    correctAnswer: "The printing press"
                },
                {
                    id: 5,
                    question: "How did Caxton's printing press affect England?",
                    options: [
                        "It made books more accessible and spread literacy.",
                        "It replaced oral traditions entirely.",
                        "It focused solely on religious texts.",
                        "It led to the decline of the English language."
                    ],
                    correctAnswer: "It made books more accessible and spread literacy."
                },
                {
                    id: 6,
                    question: "What era does England in the Age of Caxton focus on?",
                    options: [
                        "The late 15th century",
                        "The Elizabethan era",
                        "The Victorian era",
                        "The Norman Conquest"
                    ],
                    correctAnswer: "The late 15th century"
                },
                {
                    id: 7,
                    question: "Which societal change is highlighted in the book?",
                    options: [
                        "The emergence of the middle class",
                        "The abolition of feudalism",
                        "The rise of industrialization",
                        "The establishment of colonial empires"
                    ],
                    correctAnswer: "The emergence of the middle class"
                },
                {
                    id: 8,
                    question: "Which types of books were first printed by Caxton?",
                    options: [
                        "Religious texts and classic literature",
                        "Scientific journals",
                        "Historical accounts",
                        "Travel diaries"
                    ],
                    correctAnswer: "Religious texts and classic literature"
                },
                {
                    id: 9,
                    question: "How did the printing press impact the English language?",
                    options: [
                        "It helped standardize spelling and grammar.",
                        "It replaced Latin as the primary written language.",
                        "It diminished the popularity of English literature.",
                        "It introduced entirely new alphabets."
                    ],
                    correctAnswer: "It helped standardize spelling and grammar."
                },
                {
                    id: 10,
                    question: "What role did the Wars of the Roses play in the age of Caxton?",
                    options: [
                        "It created political instability that influenced literature.",
                        "It directly funded Caxton's printing press.",
                        "It prevented the spread of literacy.",
                        "It encouraged religious reforms through printing."
                    ],
                    correctAnswer: "It created political instability that influenced literature."
                }
            ];
                        
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='age_of_caxon';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForEnglandInTheAgeOfCaxton.forEach((question)=>{
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
                <h1 className="quiz-title">Age Of Caxon</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForEnglandInTheAgeOfCaxton.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForEnglandInTheAgeOfCaxton.length}</h2>}
                </div>
  )
}

export default Ephemeral_test