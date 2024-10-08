import { useDispatch, useSelector } from 'react-redux';
import './TestsPage.css';
import * as testActions from '../../redux/questions';
import * as matsActions from '../../redux/studyMats';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestsPage = () => {
    const tests = useSelector(state => state.mats.tests);
    // const questions = useSelector(state => state.questions.byId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(testActions.getAllQuestionsThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Browse Practice Tests</h1>
            <div className='browse-tests-container'>
                {tests && tests.map((test) => {
                    return (
                        <div key={test.id} className='one-test-browse' onClick={()=>navigate(`/tests/${test.id}`)}>
                            <div>{test.name}</div>
                            <div>Category: {test.category}</div>
                            <div>Created By: {test.ownerId}</div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default TestsPage;
