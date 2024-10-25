const ADD_IMAGE_AWS = 'temporary/add_image';
const SEND_MESSAGE = 'temporary/send_message';

const addImage = imgUrl => {
    return {
        type: ADD_IMAGE_AWS,
        payload: imgUrl
    }
}

const sendMessage = payload => {
    return {
        type: SEND_MESSAGE,
        payload
    }
}

export const addImageThunk = (post) => async (dispatch) => {
    const response = await fetch(`/api/images`, {
        method: "POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     "Content-Type": "application/json",
        //   },
        body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(addImage(resPost));
    } else {
        const error = await response.json();
        return error;
    }
}

export const sendMessageThunk = () => async dispatch => {
    const res = await fetch(`/api/sockets`);
    if(res.ok){
        const data = await res.json();
        dispatch(sendMessage(data));
        return data;
    } else {
        const error = await res.json()
        return error;
    }
}

const initialState = {}

export default function temporaryReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE_AWS:
            return { ...state, image: action.payload }
        case SEND_MESSAGE:
            return {...state, messages: action.payload}
        default:
            return state
    }
}
