import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { userReducer } from "./reducers/userReducer";
import { combineReducers } from "redux";

const middleware = [thunk];
const rootReducer = combineReducers({
  user: userReducer,
});
const makeStore = () =>
  createStore(rootReducer, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);
export default wrapper;
