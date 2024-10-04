import { useState } from 'react';
import './NewTestForm.css';

const NewTestForm = () => {
    const [name,setName] = useState('');
    const [question,setQuestion] = useState('');
    const [answer1,setAnswer1] = useState('');
    const [answer2,setAnswer2] = useState('');
    const [answer3,setAnswer3] = useState('');
    const [answer4,setAnswer4] = useState('');
    const [correctAnswer,setCorrectAnswer] = useState('');

    return (
        <div>
            <h1>create a new practice test</h1>
            <form>
                <div>
                    <label>
                        <input></input>
                    </label>
                </div>
            </form>
        </div>
    )
}
export default NewTestForm;
