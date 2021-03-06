const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const SET_SHOW_POPUP = 'SET_SHOW_POPUP'
const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

const defaultState = {
  loader: false,
  popupDisplay: 'none',
  notification: null
}

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_LOADER: return {...state, loader: true}
    case HIDE_LOADER: return {...state, loader: false}
    case SET_SHOW_POPUP: return {...state, popupDisplay: action.payload}
    case ADD_NOTIFICATION: return {...state, notification: action.payload}
    case DELETE_NOTIFICATION:
        return {...state, notification: null}
    default:
        return state
  }
}

export const showLoader = () => ({type: SHOW_LOADER})
export const hideLoader = () => ({type: HIDE_LOADER})
export const setShowPopup = (display) => ({type: SET_SHOW_POPUP, payload: display})

let timer
export const addNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: content,
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: DELETE_NOTIFICATION,
  }
}

