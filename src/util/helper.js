import { setMessage } from './../redux/appReducer';

export const spendMessage = (newNotification) => {
  return async dispatch => {
    dispatch(setMessage(newNotification))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}