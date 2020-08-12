import React from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { toggleTodo } from './../_actions';
import Todo from './Todo';

const TodoList = (props) => {
    const { list } = props;
    // console.log('props :: ', props);

    const dispatch = useDispatch();

    return(
        <ul>
            {list.map(v => (
                <Todo key={v._id} {...v} onClick={() => dispatch(toggleTodo(v))}/>
            ))}
        </ul>
    );
}

TodoList.propTypes = {
    list: PropTypes.arrayOf(
        // 특정 형태를 갖는 객체
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default TodoList;