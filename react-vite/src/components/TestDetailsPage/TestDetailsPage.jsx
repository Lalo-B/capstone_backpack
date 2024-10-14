import { useParams } from 'react-router-dom';
import './TestDetailsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import OneQuestion from './OneQuestion';
import { useContext, useEffect, useState } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as questionActions from '../../redux/questions';
import * as matsActions from '../../redux/studyMats';

const TestDetailsPage = () => {
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const {id} = useParams();
    const questions = useSelector(state=>state.questions.byTestId);
    const tests = useSelector(state=>state.mats.tests)
    const dispatch = useDispatch();
    const [stateScore, setStateScore] = useState();

    useEffect(()=>{
        dispatch(matsActions.getAllMatsThunk())
        dispatch(questionActions.getAllQuestionsThunk())
        setIsSubmit(false);
    },[dispatch]);

    const onSubmit = (e) => {
        e.preventDefault()
        const form = document.getElementById('p-test-form');
        const data = Object.fromEntries(new FormData(form));
        const score = {'length':0, 'correct': 0, 'incorrect': 0};
        for(let q in questions[id]){
            let id2 = questions[id][q].id
            if(questions[id][q].correctAnswer === data[id2]){
                score[id2] = {
                    status: 'correct',
                    answer: `${data[id2]}`
                }
                score.length += 1
                score.correct += 1
            } else {
                score[id2] = {
                    status: 'incorrect',
                    answer: `${data[id2]}`
                }
                score.length += 1
                score.incorrect += 1
            }
        }
        score.finalScore = (score.correct / score.length)
        setStateScore(score)
        console.log(score)
    };

    if(!questions)return <h1>Loading...</h1>

    return (
        <div style={{margin: 'auto', maxWidth: '500px'}}>
            <h1>{tests && tests.find((t)=>t.id === +id).name}</h1>
            <form id='p-test-form' onSubmit={onSubmit} className='questions-container'>
                {questions&& questions[id] && questions[id].map((q) => {
                    return (<OneQuestion key={q.id} q={q} score={stateScore}/>)
                })}
            <button style={{marginTop: '10px'}}>submit test</button>
            </form>
            <button style={{marginTop: '10px', width: '100%'}} onClick={()=>{
                const form = document.getElementById('p-test-form');
                form.reset();
                // alert('test was reset!')
            }}>reset test</button>
            {stateScore && <p>Your score is {stateScore.finalScore*100}%</p>}
        </div>
    )
}
export default TestDetailsPage;
