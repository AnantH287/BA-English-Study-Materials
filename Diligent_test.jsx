import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Diligent_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForSocialHistory = [
                {
                    id: 1,
                    question: "Who is the author of Social History of Shakespeare's England?",
                    options: ["E.M.W. Tillyard", "William Shakespeare", "Christopher Marlowe", "Ben Jonson"],
                    correctAnswer: "E.M.W. Tillyard"
                },
                {
                    id: 2,
                    question: "What period does Social History of Shakespeare's England primarily focus on?",
                    options: [
                        "The Tudor period",
                        "The Victorian era",
                        "The Middle Ages",
                        "The 18th century"
                    ],
                    correctAnswer: "The Tudor period"
                },
                {
                    id: 3,
                    question: "What does the book explore about Shakespeare's time?",
                    options: [
                        "The social structure and daily life",
                        "The biography of Shakespeare",
                        "The history of English literature",
                        "The architectural styles of the period"
                    ],
                    correctAnswer: "The social structure and daily life"
                },
                {
                    id: 4,
                    question: "Which of the following is a key theme in the book?",
                    options: [
                        "Class distinctions and their impact on society",
                        "The technicalities of Shakespeare's language",
                        "The influence of Greek drama on Shakespeare",
                        "The personal life of Shakespeare"
                    ],
                    correctAnswer: "Class distinctions and their impact on society"
                },
                {
                    id: 5,
                    question: "How does the book provide insights into Shakespeare's plays?",
                    options: [
                        "By relating them to the social context of the period",
                        "By analyzing their literary style",
                        "By focusing on their critical reception",
                        "By comparing them to contemporary works"
                    ],
                    correctAnswer: "By relating them to the social context of the period"
                },
                {
                    id: 6,
                    question: "What aspect of daily life in Shakespeare's England is discussed in the book?",
                    options: [
                        "Agriculture and trade",
                        "Modern scientific advancements",
                        "The Industrial Revolution",
                        "Colonial expansion"
                    ],
                    correctAnswer: "Agriculture and trade"
                },
                {
                    id: 7,
                    question: "Which social class is highlighted in Tillyard's analysis?",
                    options: [
                        "The gentry and the rising middle class",
                        "The aristocracy exclusively",
                        "The clergy and religious figures",
                        "The peasant class only"
                    ],
                    correctAnswer: "The gentry and the rising middle class"
                },
                {
                    id: 8,
                    question: "What does the book say about the role of women in Shakespeare's England?",
                    options: [
                        "Women were primarily confined to domestic roles.",
                        "Women held significant political power.",
                        "Women frequently served as playwrights.",
                        "Women had equal social rights as men."
                    ],
                    correctAnswer: "Women were primarily confined to domestic roles."
                },
                {
                    id: 9,
                    question: "What is one of the sources Tillyard uses to construct the social history?",
                    options: [
                        "Legal documents and court records",
                        "Personal letters of Shakespeare",
                        "Modern interpretations of Shakespeare's plays",
                        "Mythological texts"
                    ],
                    correctAnswer: "Legal documents and court records"
                },
                {
                    id: 10,
                    question: "What is the significance of the book in understanding Shakespeare's works?",
                    options: [
                        "It contextualizes his works within the era's social dynamics.",
                        "It explains his personal motivations for writing.",
                        "It provides translations of his texts.",
                        "It solely focuses on his poetic techniques."
                    ],
                    correctAnswer: "It contextualizes his works within the era's social dynamics."
                }
            ];            
            
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='shakespeare_england';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForSocialHistory.forEach((question)=>{
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
                <h1 className="quiz-title">Shakespeare's England-2</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForSocialHistory.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForSocialHistory.length}</h2>}
                </div>
  )
}

export default Diligent_test