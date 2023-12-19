//dependencies for redux store setup
/* @redux-devtools/extension, react-redux, redux-thunk, redux   */
import { createStore, applyMiddleware } from "redux";
import { combined } from "./combineReducers" 
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
const middlwares = [thunk];

const setMiddleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlwares))
    : applyMiddleware(...middlwares);

export const store = createStore(combined, setMiddleware);