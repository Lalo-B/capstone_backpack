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

    const helperF = async () => {
        // const val = await dispatch(setActions.makeNewCardThunk(newCard,setId))
        // console.log('this is return from dispatch',val)
        // return val
        dispatch(setActions.updateSingleCardThunk(updateCard, card.id))
        .then(()=>navigate(`/flashcards/${setId}`))
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
export default EditOneCard;
