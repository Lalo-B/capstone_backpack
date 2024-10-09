import { useParams } from 'react-router-dom';
import './EditSetPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import * as cardActions from '../../redux/flashcards';
import * as matActions from '../../redux/studyMats';
import EditOneCard from './EditOneCard';
import { SubmitContext } from '../../context/SubmitContext';


const EditSetPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const sets = useSelector(state => state.mats.sets);
    const cards = useSelector(state => state.flashcards.bySetId);//object
    const [curSet, setCurSet] = useState();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const { isSubmit, setIsSubmit } = useContext(SubmitContext);
    //! does this break if they do an update twice?--------------------------------------------------

    // const [arr, setArr] = useState([1]);
    // set this arr to have the current cards and add
    // a new card form field if they click add new card?

    useEffect(() => {
        dispatch(matActions.getAllMatsThunk())
        dispatch(cardActions.getAllFlashcardsThunk())
    }, [dispatch])

    const setInputs = () => {
        if (curSet) {
            setName(curSet.setName)
            setCategory(curSet.category)
        }
    }

    useEffect(() => {
        if (sets) {
            let temp = sets.find(el => el.id === +id);
            setCurSet(temp)
        }
    }, [sets, id])

    useEffect(() => {
        setInputs()
    }, [curSet])

    const onSubmit = (e) => {
        e.preventDefault();
        const update = {
            "set_name": name, category
        }
        dispatch(matActions.updateSetThunk(update, id))
        setIsSubmit(true)
        // now if i navigate here will it happen before the cards update?
        // is that possible?
        // maybe we need to await this
        // navigate(`/flashcards/${id}`) i was right doesnt update
    }

    return (
        <div>
            <h1>edit set {id} page</h1>
            {curSet && curSet.id}
            <form onSubmit={onSubmit}>
                <div className='edit-set-info-container'>
                    <label>Set name:
                        <input
                            className='input'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Set name'
                        />
                    </label>
                    <label>New set category:
                        <input
                            className='input'
                            type='text'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Set category'
                        />
                    </label>
                </div>
                <div className='edit-set-cards-container'>
                    {cards && curSet && cards[curSet.id] && cards[curSet.id].map((card) => {
                        return (
                            // <div key={card.id}> this is a card
                            //     <input value={card.question} />
                            //     <input value={card.answer} />
                            // </div>
                            <EditOneCard key={card.id} card={card} setId={curSet.id} />
                        )
                    })}
                </div>
                <button>save changes</button>
            </form>
            {/* <button onClick={() => { setArr([...arr, 1]) }}>+ add another card</button> */}
            {/* then map over this array to do the add card thing but
            atm dont worry about this */}
        </div>
    )
}
export default EditSetPage;
