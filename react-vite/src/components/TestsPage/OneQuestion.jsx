import './TestsPage.css';

const OneQuestion = ({q}) => {
    return (
        <div className="one-question">
            <div>{q.question}</div>
            <div>{q.answer1}</div>
            <div>{q.answer2}</div>
            <div>{q.answer3}</div>
            <div>{q.answer4}</div>
        </div>
    )
}
export default OneQuestion;
