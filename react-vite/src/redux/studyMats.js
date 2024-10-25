const GET_ALL_STUDY_MATS = 'studyMats/getAll';
const UPDATE_PRACTICE_TEST = 'flashcards/update_test';
const DELETE_TEST = 'flashcards/delete_test';
const UPDATE_FLASHCARD_SET = 'flashcards/update_set';
const DELETE_SET = 'flashcards/delete_set';

const getAllMats = (payload) => {
    return {
        type: GET_ALL_STUDY_MATS,
        payload
    }
}

const updateTest = (payload) => {
    return {
        type: UPDATE_PRACTICE_TEST,
        payload
    }
}

const deleteTest = (payload) => {
    return {
        type: DELETE_TEST,
        payload
    }
}

const updateSet = (payload) => {
    return {
        type: UPDATE_FLASHCARD_SET,
        payload
    }
}

const deleteSet = (payload) => {
    return {
        type: DELETE_SET,
        payload
    }
}

export const getAllMatsThunk = () => async dispatch => {
    const res = await fetch('/api/backpacks/get-all')
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllMats(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const updateTestThunk = (payload, testId) => async dispatch => {
    const res = await fetch(`/api/practice-tests/update/${testId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(updateTest(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const deleteTestThunk = (testId) => async dispatch => {
    const res = await fetch(`/api/practice-tests/delete/${testId}`, {
        method: "DELETE",

    })
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteTest(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const updateSetThunk = (payload, setId) => async dispatch => {
    const res = await fetch(`/api/flashcards/update-set/${setId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(updateSet(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const deleteSetThunk = (setId) => async dispatch => {
    const res = await fetch(`/api/flashcards/delete/${setId}`, {
        method: "DELETE",

    })
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteSet(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

const initialState = {};

export default function studyMatsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STUDY_MATS:
            return { ...state, ...action.payload }
        case UPDATE_PRACTICE_TEST: {
            return { ...state }
        }
        case DELETE_TEST: {
            const newState = { ...state, tests: [...state.tests] };
            const index = newState.tests.findIndex((el)=>el.id === action.payload.id)
            newState.tests.splice(index,1);
            return { ...newState }
        }
        case UPDATE_FLASHCARD_SET: {
            return { ...state }
        }
        case DELETE_SET: {
            const newState = { ...state, sets: [...state.sets] };
            const index = newState.sets.findIndex((el)=>el.id === action.payload.id)
            newState.sets.splice(index,1);
            return { ...newState }
        }
        default:
            return state
    }
}
