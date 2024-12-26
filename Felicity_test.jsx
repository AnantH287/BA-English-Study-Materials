import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Felicity_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForLiteraryForms = [
                {
                    id: 1,
                    question: "What is a primary characteristic of a tragedy?",
                    options: [
                        "It ends with the downfall of the protagonist.",
                        "It always has a happy ending.",
                        "It focuses on supernatural elements.",
                        "It is purely humorous and entertaining."
                    ],
                    correctAnswer: "It ends with the downfall of the protagonist."
                },
                {
                    id: 2,
                    question: "Which of the following is a hallmark of comedy?",
                    options: [
                        "The resolution of conflicts in a humorous way.",
                        "A focus on serious and somber themes.",
                        "The use of tragic flaws in the protagonist.",
                        "An inevitable sense of despair in the narrative."
                    ],
                    correctAnswer: "The resolution of conflicts in a humorous way."
                },
                {
                    id: 3,
                    question: "Which Greek philosopher famously analyzed tragedy in his work Poetics?",
                    options: [
                        "Aristotle",
                        "Plato",
                        "Socrates",
                        "Euripides"
                    ],
                    correctAnswer: "Aristotle"
                },
                {
                    id: 4,
                    question: "What is the central theme of most tragedies?",
                    options: [
                        "Human suffering and moral dilemmas",
                        "Romantic relationships and marriages",
                        "Satirical commentary on society",
                        "Adventures and heroic quests"
                    ],
                    correctAnswer: "Human suffering and moral dilemmas"
                },
                {
                    id: 5,
                    question: "Which of the following plays is an example of Shakespearean comedy?",
                    options: [
                        "A Midsummer Night's Dream",
                        "Macbeth",
                        "Hamlet",
                        "King Lear"
                    ],
                    correctAnswer: "A Midsummer Night's Dream"
                },
                {
                    id: 6,
                    question: "What term describes a humorous scene or character in a tragedy to lighten the mood?",
                    options: [
                        "Comic relief",
                        "Satire",
                        "Farce",
                        "Burlesque"
                    ],
                    correctAnswer: "Comic relief"
                },
                {
                    id: 7,
                    question: "Which of the following is an example of a classical tragedy?",
                    options: [
                        "Oedipus Rex by Sophocles",
                        "The Importance of Being Earnest by Oscar Wilde",
                        "Twelfth Night by William Shakespeare",
                        "The Rivals by Richard Brinsley Sheridan"
                    ],
                    correctAnswer: "Oedipus Rex by Sophocles"
                },
                {
                    id: 8,
                    question: "What is a typical ending of a comedy?",
                    options: [
                        "A resolution leading to harmony and happiness.",
                        "The death of the main character.",
                        "A moral lesson delivered through suffering.",
                        "A clash between good and evil."
                    ],
                    correctAnswer: "A resolution leading to harmony and happiness."
                },
                {
                    id: 9,
                    question: "What is the purpose of catharsis in tragedy?",
                    options: [
                        "To purge emotions of pity and fear in the audience.",
                        "To provoke laughter and amusement.",
                        "To provide detailed background information.",
                        "To criticize societal norms satirically."
                    ],
                    correctAnswer: "To purge emotions of pity and fear in the audience."
                },
                {
                    id: 10,
                    question: "What is one of the primary differences between tragedy and comedy?",
                    options: [
                        "Tragedy focuses on human flaws, while comedy emphasizes human folly.",
                        "Tragedy always includes supernatural elements, while comedy does not.",
                        "Comedy uses formal language, while tragedy uses colloquial language.",
                        "Comedy avoids conflicts, while tragedy thrives on them."
                    ],
                    correctAnswer: "Tragedy focuses on human flaws, while comedy emphasizes human folly."
                }
            ];
            
                                    
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='tragedy_comedy';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForLiteraryForms.forEach((question)=>{
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
                <h1 className="quiz-title">Tragedy-Comedy</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForLiteraryForms.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForLiteraryForms.length}</h2>}
                </div>
  )
}

export default Felicity_test