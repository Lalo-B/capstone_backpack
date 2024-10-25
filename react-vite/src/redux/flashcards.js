const GET_ALL_FLASHCARDS = 'flashcards/get_all';
const MAKE_NEW_SET = 'flashcards/new_set';
const MAKE_NEW_CARD = 'flashcards/new_card';
const UPDATE_SINGLE_CARD = 'flashcards/update_single_card';

const getAllFlashcards = (payload) => {
    return {
        type: GET_ALL_FLASHCARDS,
        payload
    }
}

const makeNewSet = (payload) => {
    return {
        type: MAKE_NEW_SET,
        payload
    }
}

const makeNewCard = (payload) => {
    return {
        type: MAKE_NEW_SET,
        payload
    }
}

const updateSingleCard = (payload) => {
    return {
        type: UPDATE_SINGLE_CARD,
        payload
    }
}

export const getAllFlashcardsThunk = () => async dispatch => {
    const res = await fetch('/api/flashcards/all_cards')
    if (res.ok){
        const data = await res.json();
        dispatch(getAllFlashcards(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const makeNewSetThunk = (payload) => async dispatch => {
    const res = await fetch(`/api/flashcards/new_set`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    });
    if(res.ok){
        const data = await res.json();
        dispatch(makeNewSet(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const makeNewCardThunk = (card, setId) => async dispatch => {
    const res = await fetch(`/api/flashcards/new_card/${setId}`, {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {'Content-Type': 'application/json'}
    });
    if(res.ok){
        const data = await res.json();
        dispatch(makeNewCard(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const updateSingleCardThunk = (payload, id) => async dispatch => {
    const res = await fetch(`/api/flashcards/update-card/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    });
    if(res.ok){
        const data = await res.json();
        dispatch(updateSingleCard(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}


const initialState = {};

export default function flashcardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_FLASHCARDS:{
            let cache = {};
            action.payload.forEach(c => {
                if(!cache[c.setId]){
                    cache[c.setId] = true;
                }
            });
            for (let id in cache){
                let setArr = [];
                action.payload.forEach((c)=>{
                    if(c.setId === +id){
                        setArr.push(c)
                    }
                })
                cache[id] = setArr;
            }
            return {...state, byId: [...action.payload], bySetId: cache}
        }
        case MAKE_NEW_SET:{
            return{...state}
        }
        case MAKE_NEW_CARD:{
            return{...state}
        }
        case UPDATE_SINGLE_CARD:{
            return {...state}
        }
        default:
            return state
    }
}
