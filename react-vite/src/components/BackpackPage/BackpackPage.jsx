import './BackpackPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as matsActions from '../../redux/studyMats';
import * as flashcardActions from '../../redux/flashcards';
import * as questionsActions from '../../redux/questions';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteModal from '../DeleteModal';

const BackpackPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sets = useSelector(state => state.mats.sets); //array
    const tests = useSelector(state => state.mats.tests); //array
    const flashcards = useSelector(state => state.flashcards.bySetId);
    const questions = useSelector(state => state.questions.byTestId);
    const user = useSelector(state => state.session.user);
    const [userSets, setUserSets] = useState();
    const [userTests, setUserTests] = useState();

    useEffect(() => {
        dispatch(matsActions.getAllMatsThunk())
        dispatch(flashcardActions.getAllFlashcardsThunk())
        dispatch(questionsActions.getAllQuestionsThunk())
    }, [dispatch])

    useEffect(() => {
        if (sets && user) {
            let curr = sets.filter(set => set.userId === user.id);
            setUserSets(curr);
        }
        if (tests && user) {
            let tCurr = tests.filter(test => test.ownerId === user.id);
            setUserTests(tCurr);
        }
    }, [user, sets, tests])

    return (
        <div style={{margin: 'auto', maxWidth: '500px'}}>
            <h1>Your Backpack</h1>
            <p>Here you can manage the materials you've created</p>
            <div className='study-mats-container'>
                sets:
                {userSets && userSets.map((sett) => {
                    return (
                        <>
                            <div key={`${sett.id},set`} className='each-set-backpack' onClick={() => navigate(`/flashcards/${sett.id}`)}>
                                <div>{sett.setName}</div>
                                <div>Category: {sett.category}</div>
                                {/* <div>Created By: {sett.userId}</div> */}
                            </div>
                            <button onClick={() => navigate(`/flashcards/edit/${sett.id}`)}>edit</button>
                            <OpenModalButton
                                modalComponent={<DeleteModal setId={sett.id}/>}
                                buttonText='delete'
                            />
                        </>
                    )
                })}
            </div>
            <div className='study-mats-container'>
                tests:
                {userTests && userTests.map((test) => {
                    return (
                        <>
                            <div key={`${test.id},test`} className='each-test-backpack' onClick={() => navigate(`/tests/${test.id}`)}>
                                <div>{test.name}</div>
                                <div>Category: {test.category}</div>
                                {/* <div>Created By: {test.ownerId}</div> */}
                            </div>
                            <button onClick={() => navigate(`/tests/edit/${test.id}`)}>edit</button>
                            <OpenModalButton
                                modalComponent={<DeleteModal testId={test.id}/>}
                                buttonText='delete'
                            />
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default BackpackPage;
