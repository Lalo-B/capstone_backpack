import { useDispatch, useSelector } from 'react-redux';
import './FlashcardsPage.css';
import { useEffect, useContext } from 'react';
import { SubmitContext } from "../../context/SubmitContext";
import * as flashcardActions from '../../redux/flashcards';
import * as matsActions from '../../redux/studyMats';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../redux/session';


const FlashcardsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    const sets = useSelector(state => state.mats.sets);
    const flashcards = useSelector(state => state.flashcards.byId)
    const users = useSelector(state=> state.session.users)


    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
        dispatch(sessionActions.getAllUsersThunk())
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
                            <div>Author: {users?.find((user) => user.id === sett.userId).username}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FlashcardsPage;
