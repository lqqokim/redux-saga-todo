import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_TODO,
    GET_TODOS,
    TOGGLE_TODO,

    ADD_TODO_SUCCESS,
    GET_TODOS_SUCCESS,
    TOGGLE_TODO_SUCCESS
} from "../constants/action-types";

const BASE_URL = 'http://localhost:5000';
// const headers = {'Content_Type' : 'application/json'};

axios.interceptors.response.use(function (response) {
    return response.data
})

function getTodosAPI() {
    return axios.get(`${BASE_URL}/api/todos`);
}

function addTodoAPI(payload) {
    return axios.post(`${BASE_URL}/api/todos`, payload)
}

function toggleTodoAPI(payload) {
    return axios.put(`${BASE_URL}/api/todo`, payload)
}

function* fetchTodos() {
    try {
        const result = yield call(getTodosAPI);
        yield put({
            type: GET_TODOS_SUCCESS,
            payload: result.data
        })
    } catch(err) {
        console.error(err)
    }
}

function* addTodo(action) {
    const { payload } = action;

    try{
        const result = yield call(addTodoAPI, payload);

        yield put({
            type: ADD_TODO_SUCCESS,
            payload: result.data
        })
    }catch (err) {
        console.error(err)
    }
}

function* toggleTodo({ payload }) {
    const { todo } = payload;

    const result = yield call(toggleTodoAPI, todo);
    
    yield put({
        type: TOGGLE_TODO_SUCCESS,
        payload: result.data
    })
}

export default function* todoWatcher() {
    yield takeEvery(GET_TODOS, fetchTodos);
    yield takeEvery(ADD_TODO, addTodo);
    yield takeEvery(TOGGLE_TODO, toggleTodo)
}