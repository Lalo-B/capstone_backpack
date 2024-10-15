import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as questionActions from '../../redux/questions';
import { SubmitContext } from '../../context/SubmitContext';
import { useNavigate } from "react-router-dom";

const EditOneQuestion = ({entireQ, testId}) => {
    // console.log(entireQ.correctAnswer)
    const { isSubmit } = useContext(SubmitContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(entireQ.question);
    const [answer1, setAnswer1] = useState(entireQ.answer1);
    const [answer2, setAnswer2] = useState(entireQ.answer2);
    const [answer3, setAnswer3] = useState(entireQ.answer3);
    const [answer4, setAnswer4] = useState(entireQ.answer4);
    const [correctAnswer, setCorrectAnswer] = useState(entireQ.correctAnswer);
    const [curQ, setCurQ] = useState({});
    const [errors, setErrors] = useState({});

    const helperF = async () => {
        // const val = await dispatch(questionActions.updateQuestionThunk(curQ,entireQ.id))
        // console.log(val)
        const res = await dispatch(questionActions.updateQuestionThunk(curQ,entireQ.id))
        if (res.errors && Object.values(res.errors).length > 0) {
            let errObj = {};
            for (let er in res.errors) {
                errObj[res.errors[er]] = `there was a problem with ${res.errors[er]}`;
            }
            setErrors(errObj)
            console.log(errors)
        }
        if(!res.errors){
            navigate(`/tests/${testId}`)
        }
        //maybe change this to res.testid or res.id to make it rely on res
    }
    useEffect(()=>{
        if(isSubmit && testId){
            helperF()
        }
    },[isSubmit,testId])

    useEffect(()=>{
        const tempQ = {
            question,
            answer1,
            answer2,
            answer3,
            answer4,
            "correct_answer":correctAnswer
        }
        setCurQ(tempQ);
    },[question,answer1,answer2,answer3,answer4,correctAnswer])

    return (
        <div className="edit-one-question">
            <label>question:
                <input
                    className='input'
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Set question'
                />
            </label>
            {errors.question && <p>please enter a question or limit the character count to less than 500</p>}
            <label>answer 1:
                <input
                    className='input'
                    type='text'
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                    placeholder='Set answer 1'
                />
            </label>
            {errors.answer1 && <p>please enter an answer or limit the character count to less than 500</p>}
            <label>answer 2:
                <input
                    className='input'
                    type='text'
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                    placeholder='Set answer 2'
                />
            </label>
            {errors.answer2 && <p>please enter an answer or limit the character count to less than 500</p>}
            <label>answer 3:
                <input
                    className='input'
                    type='text'
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
                    placeholder='Set answer 3'
                />
            </label>
            {errors.answer3 && <p>please enter an answer or limit the character count to less than 500</p>}
            <label>answer 4:
                <input
                    className='input'
                    type='text'
                    value={answer4}
                    onChange={(e) => setAnswer4(e.target.value)}
                    placeholder='Set answer 4'
                />
            </label>
            {errors.answer4 && <p>please enter an answer or limit the character count to less than 500</p>}
            <label> correct answer:
                <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                    <option disabled={true}>select an answer</option>
                    <option value={'answer1'}>answer 1</option>
                    <option value={'answer2'}>answer 2</option>
                    <option value={'answer3'}>answer 3</option>
                    <option value={'answer4'}>answer 4</option>
                </select>
            </label>
            {errors.correct_answer && <p>please select a value for the correct answer</p>}
        </div>
    )
}
export default EditOneQuestion;
