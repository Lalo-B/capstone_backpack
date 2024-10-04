import { useDispatch, useSelector } from 'react-redux';
import './FlashcardSet.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as flashcardActions from '../../redux/flashcards';
import * as matsActions from '../../redux/studyMats';
import OneCard from '../FlashcardsPage/OneCard';

const FlashcardSet = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const flashcards = useSelector(state=> state.flashcards.bySetId)

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
    }, [dispatch]);

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
