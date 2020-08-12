import { connect } from 'react-redux';
import { toggleTodo, getTodos } from '../_actions';
import TodoList from '../components/TodoList';
import { VisibilityFilters } from "../_actions";

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

/**
 * @param state
 * @returns {{todos: *}}
 */
const mapStateToProps = state => {
    console.log('mapStateToProps :: ', state)

    return {
        // reducer todos
        todos: getVisibleTodos(state.todoReducer.todos, state.visibilityFilter)
    }
}

/**
 *
 * @param dispatch
 * @returns {{toggleTodo: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        // action toggleTodo
        // getTodos: () => dispatch(getTodos()),
        toggleTodo: id => dispatch(toggleTodo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)