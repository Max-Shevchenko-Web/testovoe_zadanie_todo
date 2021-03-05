const SET_TASKS = 'SET_TASKS'
const SET_TOTAL_TASK_COUNT = 'SET_TOTAL_TASK_COUNT'
const SET_ALL_PAGES = 'SET_ALL_PAGES'
const INCREMENT_ACTIVE_STEP = 'INCREMENT_ACTIVE_STEP'
const DECREMENT_ACTIVE_STEP = 'DECREMENT_ACTIVE_STEP'
const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
const SET_SORT_FIELD = 'SET_SORT_FIELD'
const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'

const defaultState = {
  tasks: [],
  totalTaskCount:0,
  currentPage: 0,
  allPages: 0,
  paginationArray:[],
  sortField: "username",
  sortDirection: "asc"
}

export default function tasksReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TASKS: return {...state, tasks: action.payload}
    case SET_TOTAL_TASK_COUNT: return {...state, totalTaskCount: action.payload}
    case SET_ALL_PAGES:
      const numTasks = state.totalTaskCount
      const allPages = Math.ceil(numTasks/3)
      const paginationArray = Array(allPages).fill().map((e,i)=>(i-1)+1);
      return {...state, allPages, paginationArray}
    case INCREMENT_ACTIVE_STEP: return {...state, currentPage: state.currentPage + 1}
    case DECREMENT_ACTIVE_STEP: return {...state, currentPage: state.currentPage - 1}
    case SET_ACTIVE_STEP: return {...state, currentPage: action.payload}
    case SET_SORT_FIELD: return {...state, sortField: action.payload}
    case SET_SORT_DIRECTION: return {...state, sortDirection: action.payload}
    default:
      return state
  }
}

export const setTasks = (tasks) => ({type: SET_TASKS, payload: tasks})
export const setTotalTaskCount = (number) => ({type: SET_TOTAL_TASK_COUNT, payload: number})
export const setAllPages = () => ({type: SET_ALL_PAGES})
export const incrementCurrentPage = () => ({type: INCREMENT_ACTIVE_STEP})
export const decrementCurrentPage = () => ({type: DECREMENT_ACTIVE_STEP})
export const setCurrentPage = (page) => ({type: SET_ACTIVE_STEP, payload: page})
export const setSortField = (sortByItem) => ({type: SET_SORT_FIELD, payload: sortByItem})
export const setSortDirection = (sortByItem) => ({type: SET_SORT_DIRECTION, payload: sortByItem})