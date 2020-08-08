import {
    ADD_TODO_SUCCESS,
    GET_TODOS_SUCCESS
} from "../constants/action-types";

const initialState = {
    todos: []
}

const todos = (state = [], action) => {
    console.log('action :: ', action, state);
 switch (action.type) {
     case 'GET_TODOS_SUCCESS':
         console.log('reducer GET_TODOS_SUCCESS', state, action);
         return {
             ...state,
             todos: []
         }
     case 'ADD_TODO_SUCCESS':
         return [...state, action.payload]
     case 'TOGGLE_TODO':
         return state.map(todo => {
           return todo.id === action.id ? { ...todo, completed: !todo.completed} : todo;
         });
     default:
         return state;
 }
}

export default todos;