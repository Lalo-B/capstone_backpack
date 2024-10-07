import { useEffect, useState } from 'react';
import './NewSetForm.css';
import OneFlashForm from './OneFlashForm';

const NewSetForm = () => {
    const [name, setName] = useState('');
    const [arr, setArr] = useState([1]);

    return (
        <div>
            <h1>create a new flash card set</h1>
            <form>
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
                </div>
                {arr.map((e,i) => {
                    return (
                        <OneFlashForm key={i} />
                    )
                })}
            </form>
            <button onClick={() => { setArr([...arr, 1]) }}>+ add another card</button>
        </div>
    )
}
export default NewSetForm;
