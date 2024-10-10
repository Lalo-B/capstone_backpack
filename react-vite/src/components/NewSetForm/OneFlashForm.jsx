import { useContext, useEffect, useState } from "react";
import { SubmitContext } from "../../context/SubmitContext";
import { useDispatch } from "react-redux";
import * as setActions from '../../redux/flashcards';
import { useNavigate } from 'react-router-dom';

const OneFlashForm = ({ setId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { isSubmit } = useContext(SubmitContext);
    const [newCard, setNewCard] = useState({});
    const [cardErrors, setCardErrors] = useState({});

    const helperF = async () => {
        const temp = await dispatch(setActions.makeNewCardThunk(newCard, setId))
        // console.log(res)
        //if res success thenits the flash card if error its errors =[]
        if (!temp.errors) {
            navigate(`/flashcards/${res.setId}`)
        }
        if (temp.errors) {
            // const temp = await dispatch(setActions.makeNewCardThunk(newCard, setId))
            let errObj = {};
            for (let er in temp.errors) {
                errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
            }
            setCardErrors(errObj)
            // console.log('errors in flash card', cardErrors)
        }
    }

    useEffect(() => {
        if (isSubmit && setId) {
            helperF()
        }
    }, [isSubmit, setId])

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
        </div>
    )
}
export default OneFlashForm;
