import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_TODO,
    GET_TODOS,
    ADD_TODO_SUCCESS,
    GET_TODOS_SUCCESS,

    SET_VISIBILITY_FILTER,
    TOGGLE_TODO
} from "../constants/action-types";

const BASE_URL = 'http://localhost:5000';
const headers = {'Content_Type' : 'application/json'};

axios.interceptors.response.use(function (response) {
    return response.data
})

function addTodoAPI(payload) {
    return axios.post(`${BASE_URL}/api/todos`, payload)
}

function* fetchTodos() {
    // const todos = yield call(() => {
    //     return axios.get(`${BASE_URL}/todos`).then(response => response)
    // })
    //
    // console.log('saga GET_TODOS_SUCCESS :: ', todos);
    // yield put({ type: GET_TODOS_SUCCESS, payload: { todos } })
    console.log('saga fetchTodo');
}

function* addTodo({payload}) {
    const result = yield call(addTodoAPI, payload);

    yield put({
        type: ADD_TODO_SUCCESS,
        payload: result.data
    })
}

export default function* todoWatcher() {
    yield takeEvery(GET_TODOS, fetchTodos);
    yield takeEvery(ADD_TODO, addTodo);
}