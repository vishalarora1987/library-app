import { combineReducers } from 'redux';
import { reducer as homeReducer } from "../modules/home"

// This is used to combine various reducers.
// When you have many scenes, different reducers from that can be combined here
const rootReducer = combineReducers({ homeReducer });

export default rootReducer;