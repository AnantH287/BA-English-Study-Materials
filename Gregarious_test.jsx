import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Gregarious_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForHeroicCouplet = [
                {
                    id: 1,
                    question: "What is a heroic couplet?",
                    options: [
                        "Two rhyming lines in iambic pentameter",
                        "Two unrhymed lines in trochaic tetrameter",
                        "A stanza of four lines in free verse",
                        "A single line of dactylic hexameter"
                    ],
                    correctAnswer: "Two rhyming lines in iambic pentameter"
                },
                {
                    id: 2,
                    question: "Which poet is considered a master of the heroic couplet?",
                    options: [
                        "Alexander Pope",
                        "John Keats",
                        "William Wordsworth",
                        "Percy Bysshe Shelley"
                    ],
                    correctAnswer: "Alexander Pope"
                },
                {
                    id: 3,
                    question: "What is the primary purpose of the heroic couplet?",
                    options: [
                        "To convey a concise and memorable idea",
                        "To narrate long epic stories",
                        "To create free-flowing, open-ended lines",
                        "To express unresolved emotions"
                    ],
                    correctAnswer: "To convey a concise and memorable idea"
                },
                {
                    id: 4,
                    question: "In which century did the heroic couplet become popular in English poetry?",
                    options: [
                        "17th and 18th centuries",
                        "16th century",
                        "19th century",
                        "14th century"
                    ],
                    correctAnswer: "17th and 18th centuries"
                },
                {
                    id: 5,
                    question: "Which famous work by Alexander Pope heavily employs heroic couplets?",
                    options: [
                        "The Rape of the Lock",
                        "Paradise Lost",
                        "The Prelude",
                        "Ode to a Nightingale"
                    ],
                    correctAnswer: "The Rape of the Lock"
                },
                {
                    id: 6,
                    question: "What is a key feature of the heroic couplet's structure?",
                    options: [
                        "Closed form with complete thought in two lines",
                        "Irregular rhythm and rhyme",
                        "Absence of punctuation within lines",
                        "Use of enjambment throughout"
                    ],
                    correctAnswer: "Closed form with complete thought in two lines"
                },
                {
                    id: 7,
                    question: "Which of the following is an example of a heroic couplet?",
                    options: [
                        "A single soul dwells in two bodies' breath, / A bond unbroken even after death.",
                        "The moon was bright upon the hill, / The silence echoed, calm and still.",
                        "The sun had set behind the hill, / But the sky remained so bright and still.",
                        "The forest whispered with ancient lore, / As shadows crept along the forest floor."
                    ],
                    correctAnswer: "A single soul dwells in two bodies' breath, / A bond unbroken even after death."
                },
                {
                    id: 8,
                    question: "What theme is commonly explored using heroic couplets?",
                    options: [
                        "Moral and philosophical ideas",
                        "Unstructured emotional outbursts",
                        "Descriptive natural landscapes",
                        "Experimental and fragmented forms"
                    ],
                    correctAnswer: "Moral and philosophical ideas"
                },
                {
                    id: 9,
                    question: "Who was one of the earliest English poets to use the heroic couplet effectively?",
                    options: [
                        "Geoffrey Chaucer",
                        "John Milton",
                        "William Blake",
                        "Andrew Marvell"
                    ],
                    correctAnswer: "Geoffrey Chaucer"
                },
                {
                    id: 10,
                    question: "What distinguishes the heroic couplet from other couplets?",
                    options: [
                        "Its use of iambic pentameter and closed structure",
                        "Its reliance on irregular meter and rhyme",
                        "Its focus on free verse and emotional fluidity",
                        "Its exclusive use in romantic poetry"
                    ],
                    correctAnswer: "Its use of iambic pentameter and closed structure"
                }
            ];
         
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='the_heroic_couplet';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForHeroicCouplet.forEach((question)=>{
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
                <h1 className="quiz-title">The Heroic Couplet</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForHeroicCouplet.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForHeroicCouplet.length}</h2>}
                </div>
  )
}

export default Gregarious_test