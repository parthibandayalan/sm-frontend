import authReducer from "../redux/ducks/Authentication";
import createSagaMiddleware from "redux-saga";
import snackbarReducer from "./ducks/Snackbar";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { watcherSaga } from "./sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import triggerReducer from "./ducks/Trigger";

//Functions to store and retreive the state
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

//Combine Reducers
const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  auth: authReducer,
  trigger: triggerReducer,
});

//Saga Middleware creation
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

sagaMiddleware.run(watcherSaga);
