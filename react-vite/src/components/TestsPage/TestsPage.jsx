import { useDispatch, useSelector } from 'react-redux';
import './TestsPage.css';
import * as testActions from '../../redux/questions';
import * as matsActions from '../../redux/studyMats';
import * as sessionActions from '../../redux/session';
import { useContext, useEffect } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import { useNavigate } from 'react-router-dom';

const TestsPage = () => {
    const tests = useSelector(state => state.mats.tests);
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    // const questions = useSelector(state => state.questions.byId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(testActions.getAllQuestionsThunk())
        dispatch(sessionActions.getAllUsersThunk())
        setIsSubmit(false);
    }, [dispatch])

    return (
        <div className='the-biggest-test-container'>
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
