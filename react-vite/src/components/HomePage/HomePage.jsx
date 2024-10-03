import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useEffect } from 'react';
import * as matsActions from '../../redux/studyMats';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mats = useSelector(state=> state.mats);

    useEffect(()=>{
        dispatch(matsActions.getAllMatsThunk())
    },[dispatch])

    return (
        <div>
            <h1>Welcome to your Backpack</h1>
            <div>materials in pack or backpack is empty message</div>
            <div>explore study materials</div>
            {mats && mats.sets && mats.sets.map((sett)=>{
                return (
                    <div key={`flashcards_${sett.id}`}>
                        <div>set name: {sett.set_name}</div>
                        <div>set category: {sett.category}</div>
                    </div>
                )
            })}
            {mats && mats.tests && mats.tests.map((test)=>{
                return (
                    <div key={`test_${test.id}`}>
                        <div>test name: {test.name}</div>
                        <div>test category: {test.category}</div>
                    </div>
                )
            })}
        </div>
    )
}
export default HomePage;
