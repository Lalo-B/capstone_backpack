const GET_ALL_QUESTIONS = 'questions/get_all';
const MAKE_NEW_QUESTION = 'questions/create_new_question';
const MAKE_NEW_PRACTICE_TEST = 'questions/create_new_practice_test';
const UPDATE_QUESTION = 'questions/update_question';

const getAllQuestions = (payload) => {
    return {
        type: GET_ALL_QUESTIONS,
        payload
    }
}

const makeNewPracticeTest = (payload) => {
    return {
        type: MAKE_NEW_PRACTICE_TEST,
        payload
    }
}

const makeNewQuestion = (payload) => {
    return {
        type: MAKE_NEW_QUESTION,
        payload
    }
}

const updateQuestion = (payload) => {
    return {
        type: UPDATE_QUESTION,
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

export const makeNewPracticeTestThunk = (payload) => async dispatch => {
    const res = await fetch(`/api/practice-tests/new`,{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        const data = await res.json();
        dispatch(makeNewPracticeTest(data))
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const makeNewQuestionThunk = (newQ,testId) => async dispatch => {
    const res = await fetch(`/api/practice-tests/new/${testId}`,{
        method: "POST",
        body: JSON.stringify(newQ),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        const data = await res.json();
        dispatch(makeNewQuestion(data))
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const updateQuestionThunk = (payload, id) => async dispatch => {
    const res = await fetch(`/api/practice-tests/update-q/${id}`,{
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        const data = await res.json();
        dispatch(updateQuestion(data));
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
        case MAKE_NEW_PRACTICE_TEST:{
            return {...state}
        }
        case MAKE_NEW_QUESTION:{
            return {...state}
        }
        case UPDATE_QUESTION:{
            return {...state}
        }
        default:
            return state
    }
}
