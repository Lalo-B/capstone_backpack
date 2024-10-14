import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useEffect } from 'react';
import * as matsActions from '../../redux/studyMats';
import * as sessionActions from '../../redux/session';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mats = useSelector(state => state.mats);
    const flashcards = useSelector(state => state.flashcards);
    const users = useSelector(state=>state.session.users);

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(sessionActions.getAllUsersThunk())
    }, [dispatch])

    return (
        <div style={{margin: 'auto', maxWidth: '500px'}}>
            <h1>Welcome to Backpack</h1>
            <div>explore study materials</div>
            <div className='homepage-container'>
                {mats && mats.sets && mats.sets.map((sett) => {
                    // console.log(sett)
                    return (
                        <div className='flashcard-sets-homepage' onClick={() => navigate(`/flashcards/${sett.id}`)} key={`flashcards_${sett.id}`}>
                            <div>set name: {sett.setName}</div>
                            <div>set category: {sett.category}</div>
                            <div>created by: {users?.find((user)=>user.id === sett.userId).username}</div>
                        </div>
                    )
                })}
                {mats && mats.tests && mats.tests.map((test) => {
                    return (
                        <div className='tests-homepage' onClick={() => navigate(`/tests/${test.id}`)} key={`test_${test.id}`}>
                            <div>test name: {test.name}</div>
                            <div>test category: {test.category}</div>
                            <div>created by: {users?.find((user)=>user.id === test.ownerId).username}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default HomePage;
