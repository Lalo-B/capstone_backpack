const GET_ALL_QUESTIONS = 'questions/getAll';
const MAKE_NEW_QUESTION = 'questions/createNewQuestion';
const MAKE_NEW_PRACTICE_TEST = 'questions/createNewPracticeTest';

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
    // console.log('new q untouched',newQ)
    // console.log('new q after json stringify',JSON.stringify(newQ))
    const res = await fetch(`/api/practice-tests/new/${testId}`,{
        method: "POST",
        body: JSON.stringify(newQ),
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        console.log('this means res is ok')
        const data = await res.json();
        console.log('this is data in thunk', data)
        dispatch(makeNewQuestion(data))
        return data
    } else {
        const errors = await res.json();
        console.log('this is errors', errors)
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
        default:
            return state
    }
}
