import { useParams } from 'react-router-dom';
import './TestDetailsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import OneQuestion from '../TestsPage/OneQuestion';
import { useEffect } from 'react';
import * as questionActions from '../../redux/questions';

const TestDetailsPage = () => {
    const {id} = useParams();
    const questions = useSelector(state=>state.questions.byTestId)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(questionActions.getAllQuestionsThunk())
    },[dispatch])

    return (
        <div>
            <h1>Practice test {id} page</h1>
            <div className='questions-container'>
                {questions&& questions[id] && questions[id].map((q) => {
                    return (<OneQuestion key={q.id} q={q} />)
                })}
            </div>
        </div>
    )
}
export default TestDetailsPage;
