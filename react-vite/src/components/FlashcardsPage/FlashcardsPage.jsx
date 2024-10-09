import { useDispatch, useSelector } from 'react-redux';
import './FlashcardsPage.css';
import { useEffect, useContext } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as flashcardActions from '../../redux/flashcards';
import * as matsActions from '../../redux/studyMats';
import { useNavigate } from 'react-router-dom';


const FlashcardsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const sets = useSelector(state => state.mats.sets);
    const flashcards = useSelector(state => state.flashcards.byId)


    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
        setIsSubmit(false);
    }, [dispatch]);

    return (
        <div>
            <h1>Browse Flashcard Sets</h1>
            <div className='browse-sets-container'>
                {sets && sets.map((sett) => {
                    return (
                        <div key={sett.id} className='one-set-in-browse' onClick={()=>navigate(`/flashcards/${sett.id}`)}>
                            <div>{sett.setName}</div>
                            <div>Category: {sett.category}</div>
                            <div>Created By: {sett.userId}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FlashcardsPage;
