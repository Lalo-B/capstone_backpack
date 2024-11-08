import { useContext, useEffect, useState } from "react";
import { SubmitContext } from "../../context/SubmitContext";
import { useDispatch } from "react-redux";
import * as setActions from '../../redux/flashcards';
import { useNavigate } from 'react-router-dom';
import ImageForm from "../ImageForm/ImageForm";

const OneFlashForm = ({ setId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { isSubmit } = useContext(SubmitContext);
    const [newCard, setNewCard] = useState({});
    const [cardErrors, setCardErrors] = useState({});
    const [cardId, setCardId] = useState();
    const [count, setCount] = useState(0);
    // we want to add an image button on each card which will show
    // the img input

    const helperF = async () => {
        const temp = await dispatch(setActions.makeNewCardThunk(newCard, setId))
        // if (!temp.errors) {
        //     navigate(`/flashcards/${temp.setId}`)
        // }
        if (temp.errors) {
            let errObj = {};
            for (let er in temp.errors) {
                errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
            }
            setCardErrors(errObj)
        }
        console.log(temp)
        setCardId(temp.id)
    }

    useEffect(() => {
        if (isSubmit && setId && count <= 0) {
            helperF()
            setCount(count + 1)
        }
    }, [isSubmit, setId, count, helperF])

    useEffect(() => {
        const tempC = { question, answer }
        setNewCard(tempC)
    }, [question, answer])

    return (
        <div className="one-card-new">
            <label>question:
                <input
                    className='input'
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Set question'
                />
            </label>
            {cardErrors.question && <p>Please input a question or limit the size of the question to less than 500 characters</p>}
            <label>answer:
                <input
                    className='input'
                    type='text'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='Set answer'
                />
            </label>
            {cardErrors.answer && <p>Please input an answer or limit the size of the answer to less than 500 characters</p>}
            <ImageForm cardId={cardId} setId={setId}/>
        </div>
    )
}
export default OneFlashForm;
