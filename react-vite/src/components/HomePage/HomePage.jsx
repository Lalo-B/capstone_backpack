import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useEffect } from 'react';
import * as matsActions from '../../redux/studyMats';
import * as sessionActions from '../../redux/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import Carousel from './Carousel';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mats = useSelector(state => state.mats);
    const currUser = useSelector(state => state.session.user);
    console.log(currUser)
    // also check curr user so we can move the login buttons

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
    }, [dispatch])

    return (
        <div className='home-page-main-container'>
            <h1 className='home-page-header'>Welcome to Backpack</h1>
            <p style={{ textAlign: 'center' }}> Take the time to learn
                something new, using flashcards or practice tests from
                a selection of different topics.</p>
            {!currUser &&
                <div className='button-holder'>
                    <OpenModalButton
                        buttonText='sign up'
                        modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                        buttonText='login'
                        modalComponent={<LoginFormModal />}
                    />
                </div>
            }
            <Carousel />
            <div className='homepage-container'>
                Flashcards:
                <div className='mat-containers-home'>
                    {mats && mats.sets && mats.sets.map((sett) => {
                        return (
                            <div className='flashcard-sets-homepage' onClick={() => navigate(`/flashcards/${sett.id}`)} key={`flashcards_${sett.id}`}>
                                <div>{sett.setName}</div>
                                <div>Author: {sett.ownerName}</div>
                            </div>
                        )
                    })}
                </div>
                Tests:
                <div className='mat-containers-home'>
                    {mats && mats.tests && mats.tests.map((test) => {
                        return (
                            <div className='tests-homepage' onClick={() => navigate(`/tests/${test.id}`)} key={`test_${test.id}`}>
                                <div>{test.name}</div>
                                <div>Author: {test.ownerName}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default HomePage;
