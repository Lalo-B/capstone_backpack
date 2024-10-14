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
    const [errors, setErrors] = useState({});

    useEffect(()=>{setIsSubmit(false)},[])

    const onSubmit = (e) => {
        e.preventDefault()
        const newT = {
            name, category
        }
        const innerFunct = async () => {
            const aThing = await dispatch(questionActions.makeNewPracticeTestThunk(newT))
            setCreatedTest(aThing)
            if(Object.values(aThing.errors).length > 0){
                let errObj = {};
                for(let er in aThing.errors){
                    errObj[aThing.errors[er]] = `there was a problem with ${aThing.errors[er]}`;
                }
                setErrors(errObj)
            }
        }
        innerFunct();
        setIsSubmit(true)
    }

    return (
        <div style={{margin: 'auto', maxWidth: '500px'}}>
            <h1>create a new practice test</h1>
            <form className='new-test-form-container' onSubmit={onSubmit}>
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
                <div className='questions-container-form'>
                    {arr.map((e, i) => {
                        return (
                            <OneQuestionForm key={i} testId={isSubmit ? createdTest?.id : null} />
                        )
                    })}
                </div>
                <button>submit</button>
            </form>
            <button style={{ marginTop: '10px', width: '100%' }} onClick={() => { setArr([...arr, 1]) }}>+ add another question</button>
        </div>
    )
}
export default NewTestForm;
