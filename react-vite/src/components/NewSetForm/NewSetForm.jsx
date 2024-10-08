import { useContext, useEffect, useState } from 'react';
import './NewSetForm.css';
import OneFlashForm from './OneFlashForm';
import { useDispatch } from 'react-redux';
import * as setActions from '../../redux/flashcards';
import { SubmitContext } from '../../context/SubmitContext';

const NewSetForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [arr, setArr] = useState([1]);
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const [createdSet, setCreatedSet] = useState();

    const innerFunct = async (newSet) => {
        const temp = await dispatch(setActions.makeNewSetThunk(newSet))
        // console.log('this is the temp new set', temp)
        setCreatedSet(temp)
        return temp
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newSet = {
            "set_name":name, category
        }
        innerFunct(newSet)
        setIsSubmit(true)
    }


    return (
        <div>
            <h1>create a new flash card set</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Set name:
                        <input
                            className='input'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Set name'
                        />
                    </label>
                    <label>New set category:
                        <input
                            className='input'
                            type='text'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Set category'
                        />
                    </label>
                </div>
                {arr.map((e, i) => {
                    return (
                        <OneFlashForm key={i} setId={isSubmit ? createdSet?.id : null}/>
                    )
                })}
                <button>submit</button>
            </form>
            <button onClick={() => { setArr([...arr, 1]) }}>+ add another card</button>
        </div>
    )
}
export default NewSetForm;
