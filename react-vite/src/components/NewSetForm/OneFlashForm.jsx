import { useState } from "react";

const OneFlashForm = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <div>
            <label>question:
                <input
                    className='input'
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Set question'
                />
            </label>
            <label>answer:
                <input
                    className='input'
                    type='text'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='Set answer'
                />
            </label>
        </div>
    )
}
export default OneFlashForm;
