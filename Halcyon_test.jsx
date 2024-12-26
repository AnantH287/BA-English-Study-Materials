import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Holcyon_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForEdwardII = [
                {
                    id: 1,
                    question: "Who wrote Edward II?",
                    options: [
                        "Christopher Marlowe",
                        "William Shakespeare",
                        "Ben Jonson",
                        "John Webster"
                    ],
                    correctAnswer: "Christopher Marlowe"
                },
                {
                    id: 2,
                    question: "What type of play is Edward II?",
                    options: [
                        "A historical tragedy",
                        "A romantic comedy",
                        "A morality play",
                        "A pastoral drama"
                    ],
                    correctAnswer: "A historical tragedy"
                },
                {
                    id: 3,
                    question: "Who is Edward II's favorite and controversial companion in the play?",
                    options: [
                        "Piers Gaveston",
                        "Roger Mortimer",
                        "Queen Isabella",
                        "Hugh Despenser"
                    ],
                    correctAnswer: "Piers Gaveston"
                },
                {
                    id: 4,
                    question: "What is the main theme of Edward II?",
                    options: [
                        "The conflict between personal desire and political duty",
                        "The triumph of love over adversity",
                        "The exploration of divine intervention",
                        "The celebration of monarchy and governance"
                    ],
                    correctAnswer: "The conflict between personal desire and political duty"
                },
                {
                    id: 5,
                    question: "Who ultimately orchestrates Edward II's downfall?",
                    options: [
                        "Roger Mortimer and Queen Isabella",
                        "Piers Gaveston",
                        "The Earl of Kent",
                        "Hugh Despenser"
                    ],
                    correctAnswer: "Roger Mortimer and Queen Isabella"
                },
                {
                    id: 6,
                    question: "What historical period does Edward II represent?",
                    options: [
                        "14th century England",
                        "16th century England",
                        "12th century England",
                        "18th century England"
                    ],
                    correctAnswer: "14th century England"
                },
                {
                    id: 7,
                    question: "How does Edward II die in the play?",
                    options: [
                        "He is murdered in a gruesome manner in Berkeley Castle.",
                        "He is executed by beheading.",
                        "He dies in battle.",
                        "He is poisoned by his enemies."
                    ],
                    correctAnswer: "He is murdered in a gruesome manner in Berkeley Castle."
                },
                {
                    id: 8,
                    question: "What role does Queen Isabella play in Edward II?",
                    options: [
                        "She conspires with Mortimer to overthrow Edward.",
                        "She remains loyal to Edward until his death.",
                        "She serves as a mediator between Edward and his nobles.",
                        "She abdicates her role as queen to join a convent."
                    ],
                    correctAnswer: "She conspires with Mortimer to overthrow Edward."
                },
                {
                    id: 9,
                    question: "What literary style is Edward II known for?",
                    options: [
                        "Blank verse",
                        "Heroic couplets",
                        "Prose",
                        "Rhyming quatrains"
                    ],
                    correctAnswer: "Blank verse"
                },
                {
                    id: 10,
                    question: "What is the significance of Edward II in English literature?",
                    options: [
                        "It is one of the earliest examples of a play exploring personal identity and kingship.",
                        "It was the first English play written entirely in rhymed verse.",
                        "It introduced the concept of romantic subplots in history plays.",
                        "It was the first play to incorporate supernatural elements prominently."
                    ],
                    correctAnswer: "It is one of the earliest examples of a play exploring personal identity and kingship."
                }
            ];
            

                     
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='edward_two';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForEdwardII.forEach((question)=>{
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
                <h1 className="quiz-title">Edward Two</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForEdwardII.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForEdwardII.length}</h2>}
                </div>
  )
}

export default Holcyon_test
