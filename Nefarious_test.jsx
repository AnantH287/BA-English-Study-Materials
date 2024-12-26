import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Nefarious_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForJespersen = [
                {
                    id: 1,
                    question: "Who was Otto Jespersen?",
                    options: [
                        "A Danish linguist",
                        "A British poet",
                        "An American philosopher",
                        "A German historian"
                    ],
                    correctAnswer: "A Danish linguist"
                },
                {
                    id: 2,
                    question: "What is one of Otto Jespersen's major contributions to linguistics?",
                    options: [
                        "Development of the theory of phonetics",
                        "Study of the origin of the English language",
                        "Research on the evolution of English grammar",
                        "Advancements in historical linguistics"
                    ],
                    correctAnswer: "Research on the evolution of English grammar"
                },
                {
                    id: 3,
                    question: "In which field did Otto Jespersen make significant advancements?",
                    options: [
                        "Syntax and grammar",
                        "Literary criticism",
                        "Poetry",
                        "Philosophical logic"
                    ],
                    correctAnswer: "Syntax and grammar"
                },
                {
                    id: 4,
                    question: "What is Otto Jespersen known for in his analysis of the English language?",
                    options: [
                        "His theory on the organic development of grammar",
                        "His work on translation methods",
                        "The development of modern linguistic terminology",
                        "The study of dialectal variations in England"
                    ],
                    correctAnswer: "His theory on the organic development of grammar"
                },
                {
                    id: 5,
                    question: "Which of Jespersen's books is highly influential in the field of linguistics?",
                    options: [
                        "Language: Its Nature, Development and Origin",
                        "The Principles of English Grammar",
                        "The History of English Literature",
                        "Philosophy of Language"
                    ],
                    correctAnswer: "Language: Its Nature, Development and Origin"
                },
                {
                    id: 6,
                    question: "What was a key element of Jespersen's approach to language?",
                    options: [
                        "Emphasis on language as an evolving, organic system",
                        "Focusing only on phonetic transcription",
                        "Strict formalization of grammar rules",
                        "Study of languages without cultural context"
                    ],
                    correctAnswer: "Emphasis on language as an evolving, organic system"
                },
                {
                    id: 7,
                    question: "Jespersen contributed to which linguistic theory?",
                    options: [
                        "Structuralism",
                        "Generative grammar",
                        "Behaviorism",
                        "Pragmatics"
                    ],
                    correctAnswer: "Structuralism"
                },
                {
                    id: 8,
                    question: "What was Jespersen's view on the use of language in society?",
                    options: [
                        "It evolves with the needs and practices of its speakers",
                        "It should remain static to preserve clarity",
                        "It must be regulated by authorities",
                        "It is an unchangeable system"
                    ],
                    correctAnswer: "It evolves with the needs and practices of its speakers"
                },
                {
                    id: 9,
                    question: "What did Jespersen argue about the development of English grammar?",
                    options: [
                        "It evolved naturally over time without external influences",
                        "It was directly influenced by Latin grammar rules",
                        "It was purely a result of Norman invasion",
                        "It remained largely unchanged for centuries"
                    ],
                    correctAnswer: "It evolved naturally over time without external influences"
                },
                {
                    id: 10,
                    question: "Which concept did Jespersen contribute to in understanding language structure?",
                    options: [
                        "The functional approach to language",
                        "The concept of universal grammar",
                        "The theory of linguistic relativity",
                        "The generative grammar hypothesis"
                    ],
                    correctAnswer: "The functional approach to language"
                }
            ];    
                                   
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='article';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForJespersen.forEach((question)=>{
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
                <h1 className="quiz-title">Article</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForJespersen.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForJespersen.length}</h2>}
                </div>
  )
}

export default Nefarious_test
