import { useContext, useEffect, useState } from "react";
import { SubmitContext } from "../../context/SubmitContext";
import { useDispatch } from "react-redux";
import * as setActions from '../../redux/flashcards';

const OneFlashForm = ({setId}) => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { isSubmit } = useContext(SubmitContext);
    const [newCard, setNewCard] = useState({});
    const [cardErrors, setCardErrors] = useState({});

    const helperF = async () => {
        dispatch(setActions.makeNewCardThunk(newCard,setId))
        // const temp = await dispatch(setActions.makeNewCardThunk(newCard,setId))
        // if(Object.values(temp.errors).length > 0){
        //     let errObj = {};
        //     for(let er in temp.errors){
        //         errObj[temp.errors[er]] = `there was a problem with ${temp.errors[er]}`;
        //     }
        //     setCardErrors(errObj)
        //     console.log('errors in flash card',cardErrors)
        // }
    }

    useEffect(()=>{
        if(isSubmit && setId){
            helperF()
        }
    },[isSubmit,setId])

    useEffect(()=>{
        const tempC = {question, answer}
        setNewCard(tempC)
    },[question,answer])

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
