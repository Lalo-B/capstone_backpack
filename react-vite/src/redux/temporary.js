const ADD_IMAGE_AWS = 'temporary/addImage'

const addImage = imgUrl => {
    return {
        type: ADD_IMAGE_AWS,
        payload: imgUrl
    }
}

export const addImageThunk = (post) => async (dispatch) => {
    // console.log('are we here')
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
        const error = await response.json()
        console.log(error)
        console.log("There was an error making your post!")
    }
}

const initialState = {}

export default function temporaryReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE_AWS:
            return { ...state, image: action.payload }
        default:
            return state
    }
}
