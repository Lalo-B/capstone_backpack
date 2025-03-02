import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import imagesReducer from './images';
import studyMatsReducer from "./studyMats";
import flashcardsReducer from "./flashcards";
import questionsReducer from "./questions";


const rootReducer = combineReducers({
  session: sessionReducer,
  images: imagesReducer,
  mats: studyMatsReducer,
  flashcards: flashcardsReducer,
  questions: questionsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
