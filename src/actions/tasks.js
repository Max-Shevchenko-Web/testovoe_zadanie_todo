import axios from 'axios'

import { API_URL, developerName } from './../config';
import { showLoader, hideLoader } from '../redux/appReducer';
import { setTasks, setTotalTaskCount } from '../redux/todoReducer';

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
        console.log(response.data)
        popupClose()
      } else {
        console.log(response.data.message)
      }
  }
}

export function updateTask(id, token, text, status) {
  return async dispatch => {
    const bodyFormData = new FormData();
    bodyFormData.append('status', status);
    bodyFormData.append('text', text);
    bodyFormData.append('token', token);

    const response = await axios.post(`${API_URL}/edit/${id}?developer=${developerName}`,
      bodyFormData,
      {headers: { "Content-Type": "multipart/form-data" }}
    )

    console.log(response.data)
  }
}
