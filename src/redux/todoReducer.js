import { updateTask } from "../actions/tasks"

const SET_TASKS = 'SET_TASKS'
const SET_TOTAL_TASK_COUNT = 'SET_TOTAL_TASK_COUNT'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const SET_ALL_PAGES = 'SET_ALL_PAGES'
const INCREMENT_ACTIVE_STEP = 'INCREMENT_ACTIVE_STEP'
const DECREMENT_ACTIVE_STEP = 'DECREMENT_ACTIVE_STEP'
const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
const SET_SORT_FIELD = 'SET_SORT_FIELD'
const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'
const UPDATE_TASK_TEXT_AND_STATUS = 'UPDATE_TASK_TEXT_AND_STATUS'

const defaultState = {
  tasks: [],
  totalTaskCount:0,
  currentPage: 1,
  allPages: 0,
  paginationArray:[],
  sortField: "username",
  sortDirection: "asc"
}

export default function tasksReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TASKS: return {...state, tasks: action.payload}
    case SET_TOTAL_TASK_COUNT: return {...state, totalTaskCount: +action.payload}
    case ADD_NEW_TASK: return {...state,
      tasks: [
        ...state.tasks.slice(0, 0),
        action.payload,
        ...state.tasks.slice(0)
      ],
      totalTaskCount: +state.totalTaskCount + 1}
    case SET_ALL_PAGES:
      const numTasks = state.totalTaskCount
      const allPages = Math.ceil(numTasks/3)
      const paginationArray = Array(allPages).fill().map((e,i)=> i+1);
      return {...state, allPages, paginationArray}
    case INCREMENT_ACTIVE_STEP: return {...state, currentPage: state.currentPage + 1}
    case DECREMENT_ACTIVE_STEP: return {...state, currentPage: state.currentPage - 1}
    case SET_ACTIVE_STEP: return {...state, currentPage: action.payload}
    case SET_SORT_FIELD: return {...state, sortField: action.payload}
    case SET_SORT_DIRECTION: return {...state, sortDirection: action.payload}
    case UPDATE_TASK_STATUS:
          return {...state,
                  tasks: state.tasks.map(task =>
                    task.id !== action.payload.id ? task : {...task, status: action.payload.status}
                  )}
    case UPDATE_TASK_TEXT_AND_STATUS:
          return {...state,
                  tasks: state.tasks.map(task =>
                    task.id !== action.payload.id ? task : {...task, status: action.payload.status, text: action.payload.text}
                  )}
    default:
      return state
  }
}

export const setTasks = (tasks) => ({type: SET_TASKS, payload: tasks})
export const setTotalTaskCount = (number) => ({type: SET_TOTAL_TASK_COUNT, payload: number})
export const addNewTask = (newTask) => {
  return async dispatch => {
    dispatch({type: ADD_NEW_TASK, payload: newTask})
    dispatch(setAllPages())
  }}
export const setAllPages = () => ({type: SET_ALL_PAGES})
export const incrementCurrentPage = () => ({type: INCREMENT_ACTIVE_STEP})
export const decrementCurrentPage = () => ({type: DECREMENT_ACTIVE_STEP})
export const setCurrentPage = (page) => ({type: SET_ACTIVE_STEP, payload: page})
export const setSortField = (sortByItem) => ({type: SET_SORT_FIELD, payload: sortByItem})
export const setSortDirection = (sortByItem) => ({type: SET_SORT_DIRECTION, payload: sortByItem})

export const updateTaskStatus = (id, token, status, option) => {
  return async dispatch => {
    let statusToChange
    if(option === 'yes' && status === 0) {
      statusToChange = 10
    }
    if(option === 'yes' && status === 1) {
      statusToChange = 11
    }
    if(option === 'no' && status === 10) {
      statusToChange = 0
    }
    if(option === 'no' && status === 11) {
      statusToChange = 1
    }
    const res = await dispatch(updateTask(id, token, null,  statusToChange))
    if(res === 'ok') {
      dispatch({
        type: UPDATE_TASK_STATUS,
        payload: {
          id,
          status: statusToChange
        }
      })
    }
  }
}

export const updateTaskTextAndStatus = (id, token, status, text) => {
  return async dispatch => {
    let statusToChange
    switch(status) {
      case 0:
            statusToChange = 1
            break
      case 10:
            statusToChange = 11
            break
      case 1:
            statusToChange = 1
            break
      case 11:
            statusToChange = 11
            break
      default:
        return ''
    }

    const res = await dispatch(updateTask(id, token, text,  statusToChange))
    if(res === 'ok') {
      dispatch({
        type: UPDATE_TASK_TEXT_AND_STATUS,
        payload: {
          id,
          status: statusToChange,
          text
        }
      })
    }
  }
}