import { combineReducers } from "redux";
import PagyReducer from "./posts/reducerPAGY";
import BlogReducer from "./posts/reducerBLOG";

const rootReducer = combineReducers({
  BlogReducer,
  PagyReducer
});

export default rootReducer;
