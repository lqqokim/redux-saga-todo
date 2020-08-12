import {
    ADD_TODO_SUCCESS,
    GET_TODOS_SUCCESS,
    TOGGLE_TODO_SUCCESS
} from "../constants/action-types";

const initialState = {
    todos: [],
}

const Todo = (state = initialState, action) => {
    const { type, payload } = action;
    console.log('todoReducer :: ', state, action);

    switch (type) {
        case GET_TODOS_SUCCESS:
            console.log('reducer GET_TODOS_SUCCESS', state, action);
            return {
                ...state,
                todos: [...state.todos, ...payload]
            }
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, payload]
            }
        case TOGGLE_TODO_SUCCESS:
            const idx = state.todos.findIndex(v => v._id === action.payload._id);
            state.todos[idx] = action.payload;

            return {
                ...state,
                todos: [...state.todos]
            }
        default:
            return state;
    }
}

export default Todo;