import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as questionActions from '../../redux/questions';
import { SubmitContext } from '../../context/SubmitContext';
import { useNavigate } from "react-router-dom";

const OneQuestionForm = ({testId}) => {
    // console.log('this is test id in the child component', testId)
    const { isSubmit } = useContext(SubmitContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [newQ, setNewQ] = useState({})

    const extraFunct = async() => {
        // const value = await dispatch(questionActions.makeNewQuestionThunk(newQ, testId))
        // return value
        const res = await dispatch(questionActions.makeNewQuestionThunk(newQ,testId))
        if(res){
            navigate(`/tests/${res.testId}`)
        }
    }
    useEffect(()=>{
        if(isSubmit && testId){
            extraFunct()
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
        setNewQ(tempQ);
    },[question,answer1,answer2,answer3,answer4,correctAnswer])

    return (
        <div className='one-question-new'>
            <label>question:
                <input
                    className='input'
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Set question'
                />
            </label>
            <label>answer 1:
                <input
                    className='input'
                    type='text'
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                    placeholder='Set answer 1'
                />
            </label>
            <label>answer 2:
                <input
                    className='input'
                    type='text'
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                    placeholder='Set answer 2'
                />
            </label>
            <label>answer 3:
                <input
                    className='input'
                    type='text'
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
                    placeholder='Set answer 3'
                />
            </label>
            <label>answer 4:
                <input
                    className='input'
                    type='text'
                    value={answer4}
                    onChange={(e) => setAnswer4(e.target.value)}
                    placeholder='Set answer 4'
                />
            </label>
            <label> correct answer:
                <select defaultValue={'select an answer'} onChange={(e) => setCorrectAnswer(e.target.value)}>
                    <option disabled={true}>select an answer</option>
                    <option value={'answer1'}>answer 1</option>
                    <option value={'answer2'}>answer 2</option>
                    <option value={'answer3'}>answer 3</option>
                    <option value={'answer4'}>answer 4</option>
                </select>
            </label>
        </div>
    )
}
export default OneQuestionForm;
