import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Plethora_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForOslerLetterWriting = [
                {
                    id: 1,
                    question: "What is Sir William Osler’s view on the role of letter writing?",
                    options: [
                        "It is an important form of communication that fosters relationships and reflection",
                        "It is obsolete in the modern world",
                        "It should be done only for formal occasions",
                        "It is only important for professional purposes"
                    ],
                    correctAnswer: "It is an important form of communication that fosters relationships and reflection"
                },
                {
                    id: 2,
                    question: "What does Osler believe is the main purpose of a letter?",
                    options: [
                        "To convey information and express emotions",
                        "To strictly communicate business-related matters",
                        "To discuss personal grievances",
                        "To entertain the reader"
                    ],
                    correctAnswer: "To convey information and express emotions"
                },
                {
                    id: 3,
                    question: "How does Osler suggest one should approach writing a letter?",
                    options: [
                        "With sincerity, simplicity, and clarity",
                        "By using complex language to impress the reader",
                        "By focusing only on factual information",
                        "By writing in a poetic or artistic style"
                    ],
                    correctAnswer: "With sincerity, simplicity, and clarity"
                },
                {
                    id: 4,
                    question: "According to Osler, why is letter writing valuable in personal relationships?",
                    options: [
                        "It helps in building lasting emotional connections",
                        "It is a way to resolve conflicts quickly",
                        "It is an efficient form of communication",
                        "It is a formalized expression of one's thoughts"
                    ],
                    correctAnswer: "It helps in building lasting emotional connections"
                },
                {
                    id: 5,
                    question: "What does Osler say about the physical appearance of a letter?",
                    options: [
                        "The presentation of the letter is just as important as its content",
                        "The appearance is unimportant as long as the content is clear",
                        "A letter should only be handwritten to be personal",
                        "Letters should only be printed for professionalism"
                    ],
                    correctAnswer: "The presentation of the letter is just as important as its content"
                },
                {
                    id: 6,
                    question: "What is one of Osler’s recommendations for writing a letter to a colleague?",
                    options: [
                        "Express warmth and encouragement while maintaining professionalism",
                        "Stick only to business matters and avoid personal comments",
                        "Avoid being too friendly to maintain authority",
                        "Use formal language and avoid any humor"
                    ],
                    correctAnswer: "Express warmth and encouragement while maintaining professionalism"
                },
                {
                    id: 7,
                    question: "How does Osler suggest one should end a letter?",
                    options: [
                        "With a warm and personal closing that reflects the tone of the letter",
                        "By using a formal closing only, regardless of the tone",
                        "By leaving it open-ended",
                        "By summarizing the entire letter again"
                    ],
                    correctAnswer: "With a warm and personal closing that reflects the tone of the letter"
                },
                {
                    id: 8,
                    question: "What role does Osler believe letter writing plays in reflection?",
                    options: [
                        "It allows the writer to reflect on their thoughts and feelings more deeply",
                        "It is a tool for recording facts and events only",
                        "It serves as a diary of one's daily activities",
                        "It is an opportunity to criticize others constructively"
                    ],
                    correctAnswer: "It allows the writer to reflect on their thoughts and feelings more deeply"
                },
                {
                    id: 9,
                    question: "What type of language does Osler recommend for effective letter writing?",
                    options: [
                        "Clear, simple, and to the point",
                        "Highly formal and academic",
                        "Flowery and descriptive",
                        "Technical and specific to the subject matter"
                    ],
                    correctAnswer: "Clear, simple, and to the point"
                },
                {
                    id: 10,
                    question: "In Osler’s opinion, how can letter writing improve personal and professional relationships?",
                    options: [
                        "By fostering open communication and emotional connection",
                        "By showing off one's eloquence and intellect",
                        "By avoiding personal topics and keeping things formal",
                        "By focusing solely on work-related matters"
                    ],
                    correctAnswer: "By fostering open communication and emotional connection"
                }
            ];
            

                               
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='letter_writting';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForOslerLetterWriting.forEach((question)=>{
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
                <h1 className="quiz-title">Letter Writting</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForOslerLetterWriting.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForOslerLetterWriting.length}</h2>}
                </div>
  )
}

export default Plethora_test
