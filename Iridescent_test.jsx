import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Iridescent_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForAllForLove = [
                {
                    id: 1,
                    question: "Who is the author of All for Love?",
                    options: [
                        "John Dryden",
                        "William Shakespeare",
                        "Christopher Marlowe",
                        "Ben Jonson"
                    ],
                    correctAnswer: "John Dryden"
                },
                {
                    id: 2,
                    question: "What type of play is All for Love?",
                    options: [
                        "A heroic tragedy",
                        "A romantic comedy",
                        "A historical drama",
                        "A morality play"
                    ],
                    correctAnswer: "A heroic tragedy"
                },
                {
                    id: 3,
                    question: "Which historical figures are central to the play All for Love?",
                    options: [
                        "Antony and Cleopatra",
                        "Romeo and Juliet",
                        "Odysseus and Penelope",
                        "Tristan and Isolde"
                    ],
                    correctAnswer: "Antony and Cleopatra"
                },
                {
                    id: 4,
                    question: "How does Dryden’s All for Love differ from Shakespeare's Antony and Cleopatra?",
                    options: [
                        "It is written in blank verse and focuses more on personal emotions.",
                        "It uses rhymed couplets and includes a comedic subplot.",
                        "It features an entirely fictional storyline.",
                        "It emphasizes Cleopatra's political ambitions over her romance."
                    ],
                    correctAnswer: "It is written in blank verse and focuses more on personal emotions."
                },
                {
                    id: 5,
                    question: "What is the central theme of All for Love?",
                    options: [
                        "The conflict between love and duty",
                        "The glory of war and conquest",
                        "The pursuit of eternal life",
                        "The triumph of reason over passion"
                    ],
                    correctAnswer: "The conflict between love and duty"
                },
                {
                    id: 6,
                    question: "What motivates Antony’s decisions in the play?",
                    options: [
                        "His love for Cleopatra and his inner conflict about honor.",
                        "His ambition for political power.",
                        "His fear of being defeated by Octavius.",
                        "His desire to reconcile with his family."
                    ],
                    correctAnswer: "His love for Cleopatra and his inner conflict about honor."
                },
                {
                    id: 7,
                    question: "What literary technique is prominently used in All for Love?",
                    options: [
                        "Unities of time, place, and action",
                        "Epic similes",
                        "Flashbacks and foreshadowing",
                        "Supernatural elements"
                    ],
                    correctAnswer: "Unities of time, place, and action"
                },
                {
                    id: 8,
                    question: "What role does Cleopatra play in Antony's downfall?",
                    options: [
                        "She influences him to prioritize love over his political responsibilities.",
                        "She conspires with Octavius to betray Antony.",
                        "She abandons him in his time of need.",
                        "She encourages him to pursue military glory instead of peace."
                    ],
                    correctAnswer: "She influences him to prioritize love over his political responsibilities."
                },
                {
                    id: 9,
                    question: "What does the play's ending symbolize?",
                    options: [
                        "The tragic cost of love and the inevitability of fate",
                        "The triumph of political ambition over personal relationships",
                        "The futility of war and conquest",
                        "The importance of loyalty to one's country"
                    ],
                    correctAnswer: "The tragic cost of love and the inevitability of fate"
                },
                {
                    id: 10,
                    question: "Why is All for Love considered a neoclassical tragedy?",
                    options: [
                        "It adheres to the unities of time, place, and action.",
                        "It incorporates supernatural elements to enhance the plot.",
                        "It features a comedic subplot alongside the main tragedy.",
                        "It uses vernacular language instead of poetic diction."
                    ],
                    correctAnswer: "It adheres to the unities of time, place, and action."
                }
            ];
                     
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='all_for_love';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForAllForLove.forEach((question)=>{
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
                <h1 className="quiz-title">All For Love</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForAllForLove.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForAllForLove.length}</h2>}
                </div>
  )
}

export default Iridescent_test
