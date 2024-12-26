import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Juxtapose_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForMurderInTheCathedral = [
                {
                    id: 1,
                    question: "Who is the author of Murder in the Cathedral?",
                    options: [
                        "T.S. Eliot",
                        "George Bernard Shaw",
                        "W.B. Yeats",
                        "Harold Pinter"
                    ],
                    correctAnswer: "T.S. Eliot"
                },
                {
                    id: 2,
                    question: "What historical figure is the central character in Murder in the Cathedral?",
                    options: [
                        "Thomas Becket",
                        "King Henry II",
                        "Richard the Lionheart",
                        "Edward the Confessor"
                    ],
                    correctAnswer: "Thomas Becket"
                },
                {
                    id: 3,
                    question: "What is the primary theme of Murder in the Cathedral?",
                    options: [
                        "The conflict between church and state",
                        "The quest for personal glory",
                        "The fall of a tragic hero",
                        "The pursuit of justice"
                    ],
                    correctAnswer: "The conflict between church and state"
                },
                {
                    id: 4,
                    question: "Where is the play Murder in the Cathedral set?",
                    options: [
                        "Canterbury Cathedral",
                        "Westminster Abbey",
                        "York Minster",
                        "St. Paul's Cathedral"
                    ],
                    correctAnswer: "Canterbury Cathedral"
                },
                {
                    id: 5,
                    question: "What is the significance of the Chorus in the play?",
                    options: [
                        "It represents the common people and their fears.",
                        "It provides comic relief.",
                        "It serves as a narrator to the events.",
                        "It criticizes Thomas Becket's decisions."
                    ],
                    correctAnswer: "It represents the common people and their fears."
                },
                {
                    id: 6,
                    question: "How many tempters visit Thomas Becket in the first act?",
                    options: [
                        "Four",
                        "Three",
                        "Two",
                        "Five"
                    ],
                    correctAnswer: "Four"
                },
                {
                    id: 7,
                    question: "What is the purpose of the tempters' visit to Thomas Becket?",
                    options: [
                        "To persuade him to abandon his moral principles",
                        "To warn him of his impending assassination",
                        "To offer him forgiveness from the king",
                        "To prepare him for his martyrdom"
                    ],
                    correctAnswer: "To persuade him to abandon his moral principles"
                },
                {
                    id: 8,
                    question: "What does Thomas Becket ultimately choose in Murder in the Cathedral?",
                    options: [
                        "Martyrdom and loyalty to God",
                        "Reconciliation with King Henry II",
                        "Exile to France",
                        "A life of luxury and compromise"
                    ],
                    correctAnswer: "Martyrdom and loyalty to God"
                },
                {
                    id: 9,
                    question: "What historical event does the play dramatize?",
                    options: [
                        "The assassination of Thomas Becket",
                        "The signing of the Magna Carta",
                        "The Hundred Years' War",
                        "The founding of the Church of England"
                    ],
                    correctAnswer: "The assassination of Thomas Becket"
                },
                {
                    id: 10,
                    question: "What literary style is predominantly used in Murder in the Cathedral?",
                    options: [
                        "Verse drama",
                        "Prose fiction",
                        "Epic poetry",
                        "Satirical comedy"
                    ],
                    correctAnswer: "Verse drama"
                }
            ];
            

            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='murder_in_the_cathedral';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForMurderInTheCathedral.forEach((question)=>{
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
                <h1 className="quiz-title">Murder In The Cathedral</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForMurderInTheCathedral.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForMurderInTheCathedral.length}</h2>}
                </div>
  )
}

export default Juxtapose_test
