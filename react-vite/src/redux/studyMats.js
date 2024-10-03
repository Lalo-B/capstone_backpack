const GET_ALL_STUDY_MATS = 'studyMats/getAll';

const getAllMats = (payload) => {
    return {
        type: GET_ALL_STUDY_MATS,
        payload
    }
}

export const getAllMatsThunk = () => async dispatch => {
    const res = await fetch('/api/backpacks/get-all')
    if (res.ok){
        const data = await res.json();
        dispatch(getAllMats(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

const initialState = {};

export default function studyMatsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STUDY_MATS:
            return {...state, ...action.payload}
        default:
            return state
    }
}
