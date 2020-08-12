import React from 'react';
import AddTodo from './../components/AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import VisibleFilterContainer from "../containers/VisibleFilterContainer";

const TodoPage = () => (
    <div>
        <AddTodo />
        <TodoListContainer />
        <VisibleFilterContainer />
    </div>
);

export default TodoPage;