import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import {reducers} from "./CombineReducers"

const middleWare = [thunk];

const setMiddleware = process.env.NODE_ENV
  ? composeWithDevTools(applyMiddleware(...middleWare))
  : applyMiddleware(...middleWare);

export const store = createStore(reducers, setMiddleware);
