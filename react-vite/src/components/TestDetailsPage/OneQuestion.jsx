import './TestDetailsPage.css';

const OneQuestion = ({ q }) => {
    return (
        <div className="one-question">
            <p className='one-question-actual-question'>{q.question}</p>
            <label>
                <input type='radio' value='answer1' name={q.id} />
                {q.answer1}
            </label>
            <label>
                <input type='radio' value='answer2' name={q.id} />
                {q.answer2}
            </label>
            <label>
                <input type='radio' value='answer3' name={q.id} />
                {q.answer3}
            </label>
            <label>
                <input type='radio' value='answer4' name={q.id} />
                {q.answer4}
            </label>
        </div>
    )
}
export default OneQuestion;
