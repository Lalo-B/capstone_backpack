import { useNavigate, useParams } from 'react-router-dom';
import './EditTestPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as questionActions from '../../redux/questions';
import * as matActions from '../../redux/studyMats';

const EditTestPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const q = useSelector(state=>state.questions.byTestId);
    const tests = useSelector(state=>state.mats.tests);

    useEffect(()=>{
        dispatch(matActions.getAllMatsThunk())
        dispatch(questionActions.getAllQuestionsThunk())
    },[dispatch])

    return (
        <div>
            <h1>edit test {id} page</h1>
        </div>
    )
}
export default EditTestPage;
