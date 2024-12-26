import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Benevolent_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForOnHisBlindness = [
                {
                    id: 1,
                    question: "Who is the author of On His Blindness?",
                    options: ["John Milton", "William Wordsworth", "John Donne", "Edmund Spenser"],
                    correctAnswer: "John Milton"
                },
                {
                    id: 2,
                    question: "What is the central theme of On His Blindness?",
                    options: [
                        "The loss of a loved one",
                        "The struggle with physical disability and faith",
                        "The beauty of nature",
                        "The celebration of love"
                    ],
                    correctAnswer: "The struggle with physical disability and faith"
                },
                {
                    id: 3,
                    question: "In the poem, what does the phrase 'light is spent' refer to?",
                    options: ["The poet's blindness", "The end of the day", "The loss of faith", "A fading candle"],
                    correctAnswer: "The poet's blindness"
                },
                {
                    id: 4,
                    question: "Which biblical parable is alluded to in the poem?",
                    options: [
                        "The Parable of the Talents",
                        "The Good Samaritan",
                        "The Prodigal Son",
                        "The Parable of the Sower"
                    ],
                    correctAnswer: "The Parable of the Talents"
                },
                {
                    id: 5,
                    question: "What literary device is used in the line 'Doth God exact day-labour, light denied?'",
                    options: ["Alliteration", "Rhetorical question", "Metaphor", "Personification"],
                    correctAnswer: "Rhetorical question"
                },
                {
                    id: 6,
                    question: "What does the poet realize by the end of the poem?",
                    options: [
                        "God does not expect more than one can give.",
                        "His blindness is a punishment from God.",
                        "His talents have been wasted.",
                        "He should work harder despite his blindness."
                    ],
                    correctAnswer: "God does not expect more than one can give."
                },
                {
                    id: 7,
                    question: "What does 'They also serve who only stand and wait' suggest?",
                    options: [
                        "Patience and faith are forms of service.",
                        "Standing idle is acceptable.",
                        "God values waiting over action.",
                        "Blindness limits one's ability to serve."
                    ],
                    correctAnswer: "Patience and faith are forms of service."
                },
                {
                    id: 8,
                    question: "What type of poem is On His Blindness?",
                    options: ["Sonnet", "Ode", "Elegy", "Epithalamium"],
                    correctAnswer: "Sonnet"
                },
                {
                    id: 9,
                    question: "Which sonnet form does On His Blindness follow?",
                    options: ["Petrarchan", "Shakespearean", "Spenserian", "Miltonic"],
                    correctAnswer: "Petrarchan"
                },
                {
                    id: 10,
                    question: "What tone best describes On His Blindness?",
                    options: ["Melancholic", "Reflective", "Angry", "Joyful"],
                    correctAnswer: "Reflective"
                }
            ];
            
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='on_his_blindness';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

questionsForOnHisBlindness.forEach((question)=>{
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
                <h1 className="quiz-title">On_His_Blindness</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForOnHisBlindness.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForOnHisBlindness.length}</h2>}
                </div>
  )
}

export default Benevolent_test