import { useEffect, useState } from 'react';
import './NewSetForm.css';
import OneFlashForm from './OneFlashForm';

const NewSetForm = () => {
    const [name, setName] = useState('');
    const [count, setCount] = useState(1);
    const [arr, setArr] = useState([]);
    useEffect(() => {
        for (let i = 0; i < count; i++) {
            arr.push(1)
        }
    }, [count])
    // need to skip initial render or something cuz the button doesnt work atm




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
                {arr.map((e) => {
                    return (
                        <OneFlashForm key={count} />
                    )
                })}
            </form>
            <button value={count} onClick={(prevCount) => { setCount(prevCount + 1) }}>+ add another card</button>
        </div>
    )
}
export default NewSetForm;
