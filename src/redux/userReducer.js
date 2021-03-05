const SET_LOGIN = "SET_LOGIN"
const LOGOUT = "LOGOUT"

const defaultState = {
  token: '',
  isAuth: false
}

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOGIN:
        return {
            ...state,
            isAuth: true,
            token: action.payload
        }
    case LOGOUT:
        return {
            ...state,
            token: '',
            isAuth: false
        }
    default:
        return state
  }
}

export const setToken = (token) => ({type: SET_LOGIN, payload: token})
export const logout = () => ({type: LOGOUT})