import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useEffect } from 'react';
import * as matsActions from '../../redux/studyMats';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mats = useSelector(state => state.mats);
    const flashcards = useSelector(state => state.flashcards);

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Welcome to your Backpack</h1>
            <div>materials in pack or backpack is empty message</div>
            <div>explore study materials</div>
            <div className='homepage-container'>
                {mats && mats.sets && mats.sets.map((sett) => {
                    // console.log(sett)
                    return (
                        <div className='flashcard-sets-homepage' onClick={() => navigate(`/flashcards/${sett.id}`)} key={`flashcards_${sett.id}`}>
                            <div>set name: {sett.setName}</div>
                            <div>set category: {sett.category}</div>
                        </div>
                    )
                })}
                {mats && mats.tests && mats.tests.map((test) => {
                    return (
                        <div className='tests-homepage' onClick={() => navigate(`/tests/${test.id}`)} key={`test_${test.id}`}>
                            <div>test name: {test.name}</div>
                            <div>test category: {test.category}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default HomePage;
