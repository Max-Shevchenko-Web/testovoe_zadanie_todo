import axios from 'axios'

import { API_URL, developerName } from './../config';
import { showLoader, hideLoader } from '../redux/appReducer';
import { addNotification } from './../redux/appReducer';
import { setTasks, setTotalTaskCount, addNewTask } from '../redux/todoReducer';
import { checkAuth } from '../util/helper';
import { logout } from './../redux/userReducer';

export function getTasks(sort_field="id", sort_direction="asc", page=0) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${API_URL}/?developer=${developerName}&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`)

      dispatch(setTasks(response.data.message.tasks))
      dispatch(setTotalTaskCount(response.data.message.total_task_count))
    } catch (e) {
      alert(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createNewTask(username, email, text, popupClose ) {
  return async dispatch => {
      const bodyFormData = new FormData();
      bodyFormData.append('username', username);
      bodyFormData.append('email', email);
      bodyFormData.append('text', text);

      const response = await axios.post(`${API_URL}/create?developer=${developerName}`,
        bodyFormData,
        {headers: { "Content-Type": "multipart/form-data" }}
      )

      if(response.data.status === 'ok') {
        popupClose()
        dispatch(addNewTask(response.data.message))
        dispatch(addNotification('New task has been created!', 5))
      } else {
        dispatch(addNotification('New task was not created!', 5))
      }
  }
}

export function updateTask(id, token, text, status) {
  return async dispatch => {
    let testAuth = checkAuth()
    if(testAuth && token) {
      const bodyFormData = new FormData();
      if(status) {
        bodyFormData.append('status', status);
      }
      if(text) {
        bodyFormData.append('text', text);
      }
      bodyFormData.append('token', token);

      const response = await axios.post(`${API_URL}/edit/${id}?developer=${developerName}`,
        bodyFormData,
        {headers: { "Content-Type": "multipart/form-data" }}
      )
        return response.data.status
    }
    dispatch(logout())
    dispatch(addNotification('You are not authorized', 5))
  }
}