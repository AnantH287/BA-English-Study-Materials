import React, { useState , } from 'react'
import axios from 'axios';
import './Common.css'
const Oblivion_test = () => {
 
            const [userAnswers,setUserAnswers]=useState({});
            const [score,setScore]=useState(null);
            const [error,setError]=useState('');

            const questionsForJespersenAdverbs = [
                {
                    id: 1,
                    question: "What is Otto Jespersen's view on the role of adverbs in language?",
                    options: [
                        "They function to modify verbs, adjectives, and other adverbs",
                        "They are unnecessary in English grammar",
                        "They only modify nouns",
                        "They serve no grammatical function"
                    ],
                    correctAnswer: "They function to modify verbs, adjectives, and other adverbs"
                },
                {
                    id: 2,
                    question: "How did Jespersen categorize adverbs in his work?",
                    options: [
                        "As words that primarily modify nouns",
                        "As words that modify verbs, adjectives, and other adverbs",
                        "As words that are only used in poetry",
                        "As words without syntactic function"
                    ],
                    correctAnswer: "As words that modify verbs, adjectives, and other adverbs"
                },
                {
                    id: 3,
                    question: "What does Jespersen emphasize about the evolution of adverbs in English?",
                    options: [
                        "They evolved from adjectives and have distinct forms",
                        "They are all derived from Latin",
                        "They were invented in the 18th century",
                        "They never change over time"
                    ],
                    correctAnswer: "They evolved from adjectives and have distinct forms"
                },
                {
                    id: 4,
                    question: "Which is an example of an adverbial form that Jespersen discusses?",
                    options: [
                        "Quickly",
                        "Quick",
                        "Quickness",
                        "Quickening"
                    ],
                    correctAnswer: "Quickly"
                },
                {
                    id: 5,
                    question: "What did Jespersen note about adverbs in relation to sentence structure?",
                    options: [
                        "They often appear at the end of the sentence",
                        "They are used to replace nouns in sentences",
                        "They are only used in questions",
                        "They modify the subject of a sentence"
                    ],
                    correctAnswer: "They often appear at the end of the sentence"
                },
                {
                    id: 6,
                    question: "In his study of adverbs, Jespersen emphasized which grammatical function?",
                    options: [
                        "Modification of adjectives and verbs",
                        "Modification of nouns only",
                        "Punctuation in written language",
                        "Use of auxiliary verbs"
                    ],
                    correctAnswer: "Modification of adjectives and verbs"
                },
                {
                    id: 7,
                    question: "What does Jespersen suggest about the frequency of adverbs in English?",
                    options: [
                        "Adverbs are used very frequently in modern English",
                        "Adverbs are rarely used",
                        "Adverbs are used mostly in formal writing",
                        "Adverbs are only found in poetry"
                    ],
                    correctAnswer: "Adverbs are used very frequently in modern English"
                },
                {
                    id: 8,
                    question: "How does Jespersen explain the formation of adverbs from adjectives?",
                    options: [
                        "By adding the suffix -ly to adjectives",
                        "By changing the spelling of the adjective",
                        "By combining adjectives with verbs",
                        "By removing vowels from the adjective"
                    ],
                    correctAnswer: "By adding the suffix -ly to adjectives"
                },
                {
                    id: 9,
                    question: "What does Jespersen say about the placement of adverbs in a sentence?",
                    options: [
                        "Adverbs usually precede the verb they modify",
                        "Adverbs always follow the subject",
                        "Adverbs are placed at the end of sentences for emphasis",
                        "Adverbs never appear in the middle of a sentence"
                    ],
                    correctAnswer: "Adverbs usually precede the verb they modify"
                },
                {
                    id: 10,
                    question: "What type of adverbs does Jespersen discuss in terms of their ability to modify other adverbs?",
                    options: [
                        "Intensifiers and degree adverbs",
                        "Quantitative adverbs only",
                        "Modal adverbs",
                        "Adverbs of place and time"
                    ],
                    correctAnswer: "Intensifiers and degree adverbs"
                }
            ];
                           
            const userId=localStorage.getItem('userId');
            const subjectId=5;
            const fieldname='adverbs';

const handleOptionChange=(id,selectedAnswer)=>{
    setUserAnswers((previousAnswers)=>({
        ...previousAnswers,
        [id]:selectedAnswer,
    }))    
}

const handleSubmit=(e)=>{
        e.preventDefault();
    let calculateScore = 0;

    questionsForJespersenAdverbs.forEach((question)=>{
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
                <h1 className="quiz-title">Adverbs</h1>
                <form onSubmit={handleSubmit}>
                    {questionsForJespersenAdverbs.map((question)=>(
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
                {score !== null && <h2>Your score: {score} / {questionsForJespersenAdverbs.length}</h2>}
                </div>
  )
}

export default Oblivion_test
