import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
});

export default rootReducer;
