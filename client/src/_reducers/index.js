import { combineReducers } from 'redux';
import Todo from './todoReducer';
import Filter from "./filterReducer";

export default combineReducers({
    Todo,
    Filter
});