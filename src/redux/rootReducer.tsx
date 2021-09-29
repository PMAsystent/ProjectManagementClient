import {combineReducers} from "redux";
import authReducer from "./auth/auth.slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;