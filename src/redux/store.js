import {applyMiddleware, compose, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

import user from "./userReducer.js";
import todo from "./todoReducer";
import app from "./appReducer";

const rootReducer = combineReducers({
  user,
  todo,
  app
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;