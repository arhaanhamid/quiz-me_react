import React from "react";
import { useNavigate } from "react-router-dom";
import Option from './Option';
import { nanoid } from "nanoid";
import { useBeforeunload } from 'react-beforeunload';

export default function QuizPage({quizData, optionSelected}){
    const navigate = useNavigate()

    const [quizInfo, setQuizInfo] = React.useState([]);
    const [quizResult, setQuizResult] = React.useState({showResult: false, correctAnswers: []});

    //Setting incoming Data to  State -quizInfo
    React.useEffect(() => {
       setQuizInfo(quizData)
    }, [quizData])

    //function to Update optionSelected, state variable - isHeld 
    function setNewInfo(id){
        setQuizInfo(prevInfo => prevInfo.map(element => {   
            const idHeld = element.all_answers.filter(item => item.id === id);
            const changeHeld = idHeld.length !== 0 ? true : false;
            
            const newAnswers = element.all_answers.map(item => {
                const newItem = {...item, isHeld: changeHeld ? (item.id === id ? !item.isHeld : false) : item.isHeld}

                newItem.isHeld ?
                !optionSelected.includes(newItem.id) && optionSelected.push(newItem.id) :
                optionSelected.includes(newItem.id) && optionSelected.splice(optionSelected.indexOf(newItem.id), 1);

                return newItem;
            })
            return {...element, all_answers: newAnswers}
        })) 
    }

    //constant containing all Question and its options using mapping n stuff
    const questionElements = quizInfo.map((element) => {
        return (
            <div key={nanoid()}>
                <h3>{element.question}</h3>

                <div className="option-container" key={nanoid()}>
                    {element.all_answers.map(item => {
                        const optionCorrect = item.option === element.correct_answer;
                        return <Option
                                    option={item.option}
                                    isHeld={item.isHeld}
                                    optionCorrect={optionCorrect}
                                    id={item.id}
                                    setInfo={setNewInfo}
                                    showResult={quizResult.showResult}
                                    key={nanoid()}
                                />
                    })} 
                </div>
                <hr />
            </div>
        )
    })

    //function to Check which options are selected and which are wrong for Results
    function checkOptions(){
        const correctOptions = [];
        for(let i=0; i<quizInfo.length; i++){
            for(let j=0; j<4; j++){
                let item = quizInfo[i].all_answers[j];
                (item.isHeld) && (item.option === quizInfo[i].correct_answer) && (correctOptions.push(true));
            }
        }
        setQuizResult({showResult: true, correctAnswers: [...correctOptions]});
    }    

    useBeforeunload(() => "The quiz will be reset!\nAre you sure you want to reload?"); 
    
    return (
        <main className="quizpage" >
            <h1>Random Category</h1>
            <div className="quiz-container">
                {questionElements}
            </div>
            <div className="footer">
                {quizResult.showResult && <p>Your Score: {quizResult.correctAnswers.length} / {quizInfo.length}</p>}
                {quizResult.showResult ?
                <button className="checkButton" onClick={() => navigate("/")}>Main Menu</button> :
                <button className="checkButton" onClick={checkOptions}>Check Answers</button>
                }
            </div>
        </main>
    )
}