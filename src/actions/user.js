import axios from 'axios'

import { API_URL, developerName } from './../config';
import { setToken } from '../redux/userReducer';
import { logout } from './../redux/userReducer';
import { addNotification, clearNotification } from './../redux/appReducer';

export const login =  (username, password) => {
  return async dispatch => {
          const bodyFormData = new FormData();
          bodyFormData.append('username', username);
          bodyFormData.append('password', password);
          const response = await axios.post(`${API_URL}/login?developer=${developerName}`,
          bodyFormData,
          {headers: { "Content-Type": "multipart/form-data" }})

          if(response.data.status === 'ok') {
            localStorage.setItem('token', response.data.message.token)
            dispatch(setToken(response.data.message.token))
            dispatch(clearNotification())
          } else {
            let password = response.data.message.password ? response.data.message.password : ''
            let username = 'Поле является обязательным для заполнения'
            const message = response.data.message.username ===  username ? `${username}` : `${password}`
            dispatch(addNotification(message, 5))
            dispatch(logout())
          }
  }
}

export const auth = () => {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if(token) {
      dispatch(setToken(token))
    }
  }
}