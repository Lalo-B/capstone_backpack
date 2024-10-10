import { useParams } from 'react-router-dom';
import './TestDetailsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import OneQuestion from './OneQuestion';
import { useContext, useEffect } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as questionActions from '../../redux/questions';

const TestDetailsPage = () => {
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const {id} = useParams();
    const questions = useSelector(state=>state.questions.byTestId)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(questionActions.getAllQuestionsThunk())
        setIsSubmit(false);
    },[dispatch]);

    const onSubmit = (e) => {
        e.preventDefault()
        const form = document.getElementById('p-test-form')
        const data = Object.fromEntries(new FormData(form));
        const score = {'length':0, 'correct': 0, 'incorrect': 0};
        for(let q in questions[id]){
            if(questions[id][q].correctAnswer === data[q]){
                score[q] = 'correct'
                score.length += 1
                score.correct += 1
            } else {
                score[q] = 'incorrect'
                score.length += 1
                score.incorrect += 1
            }
        }
        score.finalScore = (score.correct / score.length)
        // console.log(score.correct)
        // const scoreStr = `${score.finalScore*100}`
        console.log(`Your score is: ${score.finalScore*100}%`)
    };

    return (
        <div style={{margin: '10px'}}>
            <h1>Practice test {id} page</h1>
            <form id='p-test-form' onSubmit={onSubmit} className='questions-container'>
                {questions&& questions[id] && questions[id].map((q) => {
                    return (<OneQuestion key={q.id} q={q} />)
                })}
            <button style={{marginTop: '10px'}}>submit test</button>
            </form>
        </div>
    )
}
export default TestDetailsPage;
