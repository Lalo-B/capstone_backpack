const ADD_IMAGE_AWS = 'temporary/add_image';
const SEND_MESSAGE = 'temporary/send_message';
const GET_ALL_SET_IMGS = 'images/get_all_set_images';
const GET_ALL_TEST_IMGS = 'images/get_all_test_images';

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

const getAllSetImages = payload => {
    return {
        type: GET_ALL_SET_IMGS,
        payload
    }
}

const getAllTestImages = payload => {
    return {
        type: GET_ALL_TEST_IMGS,
        payload
    }
}

export const addImageSetThunk = (post, id) => async (dispatch) => {
    const res = await fetch(`/api/images/set/${id}`, {
        method: "POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     "Content-Type": "application/json",
        //   },
        body: post,
    });

    if (res.ok) {
        // const { resPost } = await response.json();
        // dispatch(addImage(resPost));
        // return resPost
        const data = await res.json();
        dispatch(addImage(data));
        return data;
    } else {
        const error = await res.json();
        console.log(error)
        return error;
    }
}

export const addImageTestThunk = (post, id) => async (dispatch) => {
    const res = await fetch(`/api/images/test/${id}`, {
        method: "POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     "Content-Type": "application/json",
        //   },
        body: post,
    });

    if (res.ok) {
        // const { resPost } = await response.json();
        // dispatch(addImage(resPost));
        // return resPost
        const data = await res.json();
        dispatch(addImage(data));
        return data;
    } else {
        const error = await res.json();
        return error;
    }
}

export const getAllSetImagesThunk = () => async dispatch => {
    const res = await fetch(`/api/images/all/cards`)
    if (res.ok){
        const data = await res.json()
        dispatch(getAllSetImages(data))
        return data
    } else {
        const error = await res.json();
        return error;
    }
}

export const getAllTestImagesThunk = () => async dispatch => {
    const res = await fetch(`/api/images/all/questions`)
    if (res.ok){
        const data = await res.json()
        dispatch(getAllTestImages(data))
        return data
    } else {
        const error = await res.json();
        return error;
    }
}

export const sendMessageThunk = () => async dispatch => {
    const res = await fetch(`/api/sockets`);
    if (res.ok) {
        const data = await res.json();
        dispatch(sendMessage(data));
        return data;
    } else {
        const error = await res.json()
        return error;
    }
}

const initialState = {}

export default function imagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE_AWS: {
            // console.log(action.payload)
            /* expected structure example
            {
            "id": 9,
            "img_url": "https://lalos-aws-bucket-personal.s3.amazonaws.com/5e7eec0abff34f4bb99425eaf039a2c5.jpg",
            "setId": 2,
            "url": "https://lalos-aws-bucket-personal.s3.amazonaws.com/5e7eec0abff34f4bb99425eaf039a2c5.jpg",
            "uuid": "5e7eec0abff34f4bb99425eaf039a2c5.jpg"
            }
            */
            return { ...state, image: action.payload }
        }
        case SEND_MESSAGE:
            return { ...state, messages: action.payload }
        case GET_ALL_SET_IMGS:
            return {...state, setImages: [...action.payload]}
        case GET_ALL_TEST_IMGS:
            return {...state, testImages: [...action.payload]}
        default:
            return state
    }
}
