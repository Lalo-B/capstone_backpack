import { useEffect, useState } from 'react';
import './TestDetailsPage.css';

const OneQuestion = ({ q, score, image }) => {
    const [color, setColor] = useState('');

    useEffect(()=>{
        if(score && score[q.id]){
            if(score[q.id].status === 'correct'){
                setColor('green')
            }
            if(score[q.id].status === 'incorrect'){
                setColor('red')
            }
        }
        if(!score){
            setColor('')
        }
    },[score])

    return (
        <div className={`one-question`}>
            <img src={image && image.url} className='question-image' />
            <p className='one-question-actual-question'>{q.question}</p>
            <label className={`${score && score[q.id].answer === 'answer1' ? color : ''}`}>
                <input type='radio' value='answer1' name={q.id} />
                {q.answer1}
            </label>
            <label className={`${score && score[q.id].answer === 'answer2' ? color : ''}`}>
                <input type='radio' value='answer2' name={q.id} />
                {q.answer2}
            </label>
            <label className={`${score && score[q.id].answer === 'answer3' ? color : ''}`}>
                <input type='radio' value='answer3' name={q.id} />
                {q.answer3}
            </label>
            <label className={`${score && score[q.id].answer === 'answer4' ? color : ''}`}>
                <input type='radio' value='answer4' name={q.id} />
                {q.answer4}
            </label>
        </div>
    )
}
export default OneQuestion;
