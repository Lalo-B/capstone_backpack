import { useNavigate, useParams } from 'react-router-dom';
import './EditTestPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import * as questionActions from '../../redux/questions';
import * as matActions from '../../redux/studyMats';
import EditOneQuestion from './EditOneQuestion'
import { SubmitContext } from '../../context/SubmitContext';
import OneQuestionForm from '../NewTestForm/OneQuestionForm';

const EditTestPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const q = useSelector(state => state.questions.byTestId);
    const tests = useSelector(state => state.mats.tests);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [curTest, setCurTest] = useState();
    const [arr, setArr] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(matActions.getAllMatsThunk())
        dispatch(questionActions.getAllQuestionsThunk())
        //maybe add setIsSubmit(false) here
    }, [dispatch])

    useEffect(() => {
        if (tests) {
            let temp = tests.find(el => el.id === +id);
            setCurTest(temp);
        }
    }, [tests, id])

    const setInputs = () => {
        if (curTest) {
            setName(curTest.name)
            setCategory(curTest.category)
        }
    }

    useEffect(() => {
        setInputs()
    }, [curTest])

    const onSubmit = async (e) => {
        e.preventDefault()
        const update = { name, category }
        const res = await dispatch(matActions.updateTestThunk(update, id))
        if(res.errors && Object.values(res.errors).length > 0){
            let errObj = {};
            for(let er in res.errors){
                errObj[res.errors[er]] = `there was a problem with ${res.errors[er]}`;
            }
            setErrors(errObj)
        }
        setIsSubmit(true)
    }

    return (
        <div className='big-box-new-test-form'>
            <h1>edit test {id} page</h1>
            <form className='update-test-form-container' onSubmit={onSubmit}>
                <label>Set test name:
                    <input
                        className='input'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Test name'
                        style={{ backgroundColor: '#B3E5FC' }}
                    />
                </label>
                {errors.name && <p>Please enter a test name or limit the name size</p>}
                <label>Set test category:
                    <input
                        className='input'
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder='Test category'
                        style={{ backgroundColor: '#B3E5FC' }}
                    />
                </label>
                {errors.category && <p>Please enter a category or limit the category size</p>}
                <div className='update-questions-container-form'>
                    {q && curTest && q[curTest.id] && q[curTest.id].map((e, i) => {
                        return (
                            <EditOneQuestion key={i} testId={id} entireQ={e} />
                        )
                    })}
                    {arr && arr.map((e, i) => {
                        return (
                            <OneQuestionForm key={i} testId={isSubmit ? curTest?.id : null} />
                        )
                    })}
                </div>
                <button>submit</button>
            </form>
            <button style={{ marginTop: '10px' }} onClick={() => { setArr([...arr, 1]) }}>+ add another question</button>
        </div>
    )
}
export default EditTestPage;
