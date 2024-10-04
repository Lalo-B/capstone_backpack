const GET_ALL_FLASHCARDS = 'flashcards/getAll';

const getAllFlashcards = (payload) => {
    return {
        type: GET_ALL_FLASHCARDS,
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
        default:
            return state
    }
}
