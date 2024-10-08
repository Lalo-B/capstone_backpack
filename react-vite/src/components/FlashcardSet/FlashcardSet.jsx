import { useDispatch, useSelector } from 'react-redux';
import './FlashcardSet.css';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import * as flashcardActions from '../../redux/flashcards';
import * as matsActions from '../../redux/studyMats';
import OneCard from '../FlashcardsPage/OneCard';
import { SubmitContext } from '../../context/SubmitContext';

const FlashcardSet = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const flashcards = useSelector(state=> state.flashcards.bySetId)
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
    }, [dispatch,id]);


    useEffect(()=>{
        if(isSubmit){
            setIsSubmit(false)
        }
    },[isSubmit])
    // on update it doesnt refresh but after clicking the cards they
    // do update????? kinda annoying but should be easy

    return (
        <div>
            <h1>flashcard set page {id}</h1>
            <div className='flashcards-container-all'>
                {flashcards && flashcards[id] && flashcards[id].map((card) => {
                    return (
                        <OneCard key={card.id} card={card} />
                    )
                })}
                {flashcards && flashcards[id] && flashcards[id].length ? null : <p>This set is empty!</p>}
            </div>
        </div>
    )
};
export default FlashcardSet;
