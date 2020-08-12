import {
    ADD_TODO,
    GET_TODOS,
    SET_VISIBILITY_FILTER,
    TOGGLE_TODO
} from "../constants/action-types";

let nextTodoId = 0;

/**
 * action creators
 * @param text
 * @returns {{payload: {id: number, text: *, completed: boolean}, type: string}}
 */
export const addTodo = text => ({
    type: ADD_TODO,
    payload: {
        id: nextTodoId++,
        text,
        completed: false
    }
})

export const getTodos = () => ({
    type: GET_TODOS
});


export const toggleTodo = todo => ({
    type: TOGGLE_TODO,
    payload: {
        todo
    }
});

export const setVisibilityFilter = filter => ({
    type: SET_VISIBILITY_FILTER,
    payload: {
        filter
    }
});

/**
 * other constant
 * @type {{SHOW_ALL: string, SHOW_ACTIVE: string, SHOW_COMPLETED: string}}
 */
export const VisibilityFilters = {
    ALL: 'ALL',
    COMPLETED: 'COMPLETED',
    ACTIVE: 'ACTIVE'
};
