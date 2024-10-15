import { useContext, useEffect, useState } from "react";
import { SubmitContext } from "../../context/SubmitContext";
import { useDispatch } from "react-redux";
import * as setActions from '../../redux/flashcards';
import { useNavigate } from "react-router-dom";


const EditOneCard = ({card, setId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const { isSubmit } = useContext(SubmitContext);
    const [updateCard, setUpdateCard] = useState();
    const [errors, setErrors] = useState({});

    const helperF = async () => {
        const res = await dispatch(setActions.updateSingleCardThunk(updateCard, card.id))
        if(res.errors && Object.values(res.errors).length > 0){
            let errObj = {};
            for(let er in res.errors){
                errObj[res.errors[er]] = `there was a problem with ${res.errors[er]}`;
            }
            setErrors(errObj)
        }
        if(!res.errors){
            navigate(`/flashcards/${setId}`)
        }
    }

    useEffect(()=>{
        if(isSubmit && card){
            helperF()
        }
    },[isSubmit, card])

    useEffect(()=>{
        const tempC = {question, answer}
        setUpdateCard(tempC)
    },[question,answer])

    return (
        <div className="edit-one-card">
            <label>question:
                <input
                    className='input'
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Set question'
                />
            </label>
            {errors.question && <p>Please input a question or limit the size of the question to less than 500 characters</p>}
            <label>answer:
                <input
                    className='input'
                    type='text'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='Set answer'
                />
            </label>
            {errors.answer && <p>Please input an answer or limit the size of the answer to less than 500 characters</p>}
        </div>
    )
}
export default EditOneCard;
