import { useContext, useEffect, useState } from 'react';
import OneQuestionForm from './OneQuestionForm';
import './NewTestForm.css';
import { useDispatch } from 'react-redux';
import * as questionActions from '../../redux/questions';
import { SubmitContext } from '../../context/SubmitContext';

const NewTestForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [arr, setArr] = useState([1]);
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const [createdTest, setCreatedTest] = useState();

    const onSubmit = (e) => {
        e.preventDefault()
        const newT = {
            name, category
        }
        const innerFunct = async () => {
            const aThing = await dispatch(questionActions.makeNewPracticeTestThunk(newT))
            setCreatedTest(aThing)
        }
        innerFunct();
        setIsSubmit(true)
    }

    return (
        <div>
            <h1>create a new practice test</h1>
            <form className='new-test-form-container' onSubmit={onSubmit}>
                <div>
                    <label>Set test name:
                        <input
                            className='input'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Test name'
                        />
                    </label>
                    <label>Set test category:
                        <input
                            className='input'
                            type='text'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Test category'
                        />
                    </label>
                </div>
                <div className='questions-container-form'>
                {arr.map((e,i) => {
                    return (
                        <OneQuestionForm key={i} testId={isSubmit ? createdTest?.id : null}/>
                    )
                })}
                </div>
                <button>submit</button>
            </form>
            <button style={{marginTop: '10px'}} onClick={() => { setArr([...arr, 1]) }}>+ add another question</button>
        </div>
    )
}
export default NewTestForm;
