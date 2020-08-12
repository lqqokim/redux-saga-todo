import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getTodos, VisibilityFilters} from '../_actions';
import TodoList from "./../components/TodoList";

const TodoListContainer = () => {
    const { todos } = useSelector(state => {
        return state.Todo;
    });
    const filter = useSelector(state => state.Filter);
    const dispatch = useDispatch();

    // console.log('TodoListContainer todos :: ', todos)


    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return(
        <TodoList list={getVisibleList(todos, filter)} />
    );
}

const getVisibleList = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.ALL:
            return todos
        case VisibilityFilters.COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

export default TodoListContainer;