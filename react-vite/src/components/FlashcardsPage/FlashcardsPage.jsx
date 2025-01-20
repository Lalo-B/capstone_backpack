import { useDispatch, useSelector } from 'react-redux';
import './FlashcardsPage.css';
import { useEffect, useContext } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as matsActions from '../../redux/studyMats';
import { useNavigate } from 'react-router-dom';


const FlashcardsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const sets = useSelector(state => state.mats.sets);


    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        setIsSubmit(false);
    }, [dispatch]);

    return (
        <div className='the-biggest-browse-box'>
            <h1>Browse Flashcard Sets</h1>
            <div className='browse-sets-container'>
                {sets && sets.map((sett) => {
                    return (
                        <div key={sett.id} className='one-set-in-browse' onClick={()=>navigate(`/flashcards/${sett.id}`)}>
                            <div>{sett.setName}</div>
                            <div>Category: {sett.category}</div>
                            <div>Author: {sett.ownerName}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FlashcardsPage;
