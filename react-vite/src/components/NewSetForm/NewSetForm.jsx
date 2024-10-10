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
    const [errors, setErrors] = useState({});

    const innerFunct = async (newSet) => {
        const temp = await dispatch(setActions.makeNewSetThunk(newSet))
        setCreatedSet(temp)
        if(Object.values(temp.errors).length > 0){
            let errObj = {};
            for(let er in temp.errors){
                errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
            }
            setErrors(errObj)
        }
        return temp
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newSet = {
            "set_name": name, category
        }
        innerFunct(newSet)
        setIsSubmit(true)
    }


    return (
        <div>
            <h1>create a new flash card set</h1>
            <form onSubmit={onSubmit} className='new-set-form-container'>
                <label>Set name:
                    <input
                        className='input'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Set name'
                        style={{backgroundColor:'#B3E5FC'}}
                    />
                </label>
                {errors.set_name && <p>Please enter a set name or limit the set name size</p>}
                <label>New set category:
                    <input
                        className='input'
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder='Set category'
                        style={{backgroundColor:'#B3E5FC'}}
                    />
                </label>
                {errors.category && <p>Please enter a category or limit the category size</p>}
                <div className='cards-container-form'>
                    {arr.map((e, i) => {
                        return (
                            <OneFlashForm key={i} setId={isSubmit ? createdSet?.id : null} />
                        )
                    })}
                </div>
                <button>submit</button>
            </form>
            <button style={{ marginTop: '10px', width: '100%' }} onClick={() => { setArr([...arr, 1]) }}>+ add another card</button>
        </div>
    )
}
export default NewSetForm;
