import axios from 'axios'

import { API_URL, developerName } from './../config';
import { setToken } from '../redux/userReducer';
import { spendMessage } from './../util/helper';
import { logout } from './../redux/userReducer';

export const login =  (username, password) => {
  return async dispatch => {
          const bodyFormData = new FormData();
          bodyFormData.append('username', username);
          bodyFormData.append('password', password);
          const response = await axios.post(`${API_URL}/login?developer=${developerName}`,
          bodyFormData,
          {headers: { "Content-Type": "multipart/form-data" }})

          if(response.data.status === 'ok') {
            dispatch(setToken(response.data.message.token))
          } else {
            let username = response.data.message.username
            let usernameMessage = username ? `username: ${username}`: ''
            let password = response.data.message.password
            let passwordMessage = password ? `password: ${password}`: ''
            const message = `${usernameMessage} ${passwordMessage}`
            dispatch(spendMessage(message))
            dispatch(logout())
          }
  }
}