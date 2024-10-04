const GET_ALL_QUESTIONS = 'questions/getAll';

const getAllQuestions = (payload) => {
    return {
        type: GET_ALL_QUESTIONS,
        payload
    }
}

export const getAllQuestionsThunk = () => async dispatch => {
    const res = await fetch('/api/practice-tests/all_Qs')
    if (res.ok){
        const data = await res.json();
        dispatch(getAllQuestions(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

const initialState = {};

export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_QUESTIONS :{
            let cache = {};
            action.payload.forEach(q => {
                if(!cache[q.testId]){
                    cache[q.testId] = true;
                }
            });
            for (let id in cache){
                let testArr = [];
                action.payload.forEach((q)=>{
                    if(q.testId === +id){
                        testArr.push(q)
                    }
                })
                cache[id] = testArr;
            }
            return {...state, byId: [...action.payload], byTestId: cache}
        }
        default:
            return state
    }
}
