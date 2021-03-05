const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const SET_SHOW_POPUP = 'SET_SHOW_POPUP'
const SET_MESSAGE = 'SET_MESSAGE'

const defaultState = {
  loader: false,
  popupDisplay: 'none',
  message: null
}

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_LOADER: return {...state, loader: true}
    case HIDE_LOADER: return {...state, loader: false}
    case SET_SHOW_POPUP: return {...state, popupDisplay: action.payload}
    case SET_MESSAGE: return {...state, message: action.payload}
    default:
        return state
  }
}

export const showLoader = () => ({type: SHOW_LOADER})
export const hideLoader = () => ({type: HIDE_LOADER})
export const setShowPopup = (display) => ({type: SET_SHOW_POPUP, payload: display})
export const setMessage = (message) => ({type: SET_MESSAGE, payload: message})