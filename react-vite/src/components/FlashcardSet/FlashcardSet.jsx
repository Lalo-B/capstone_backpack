import { useDispatch, useSelector } from 'react-redux';
import './FlashcardSet.css';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as flashcardActions from '../../redux/flashcards';
import * as matsActions from '../../redux/studyMats';
import * as imageActions from '../../redux/images';
import OneCard from '../FlashcardsPage/OneCard';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const FlashcardSet = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const flashcards = useSelector(state => state.flashcards.bySetId)
    const images = useSelector(state => state.images.setImages)
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const [curIndex, setCurIndex] = useState(0);
    const sets = useSelector(state=>state.mats.sets)

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
        dispatch(imageActions.getAllSetImagesThunk())
        setIsSubmit(false);
    }, [dispatch, id]);


    useEffect(() => {
        if (isSubmit) {
            setIsSubmit(false)
        }
    }, [isSubmit])

    const cycleFuntion = (val) => {
        if (curIndex === 0 && val === 'down') {
            //pass
        }
        if (curIndex > 0 && val === 'down') {
            setCurIndex(curIndex - 1)
        }
        if (curIndex === flashcards[id].length - 1 && val === 'up') {
            //pass
        }
        if (curIndex < flashcards[id].length - 1 && val === 'up') {
            setCurIndex(curIndex + 1)
        }
    }
    if (!flashcards) return <h1>loading ...</h1>

    return (
        <div style={{margin: 'auto', maxWidth: '500px'}}>
            <h1>{sets && sets.find((t)=>t.id === +id) ? sets.find((t)=>t.id === +id).setName : '' }</h1>
            <div className='flashcards-container-all'>
                {/* {flashcards && flashcards[id] && flashcards[id].map((card,i) => {
                    return (
                        <OneCard key={card.id} card={card} />
                    )
                })} */}
                {flashcards && flashcards[id] && <OneCard key={flashcards[id][curIndex].id} card={flashcards[id][curIndex]} image={images?.find(el=>el.cardId === flashcards[id][curIndex].id)} />}
                <div className='arrow-box'>
                    <FaArrowLeft className='arrow-in-sets' onClick={() => cycleFuntion('down')} />
                        <p style={{userSelect: 'none'}}>{curIndex+1}/{flashcards[id] && flashcards[id].length ? flashcards[id].length : ''}</p>
                    <FaArrowRight className='arrow-in-sets' onClick={() => cycleFuntion('up')} />
                </div>
                {flashcards && flashcards[id] && flashcards[id].length ? null : <p>This set is empty!</p>}
            </div>
        </div>
    )
};
export default FlashcardSet;
