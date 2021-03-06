import React from 'react'
import no_img from '../../assets/img/no-img.png'
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../../redux/todoReducer';
import Editor from './../Editor/index';
import { updateTaskTextAndStatus } from './../../redux/todoReducer';

function Task({id, image_path, username, email, text, status, token, isAuth}) {
  const dispatch = useDispatch()
  const [selectStaus, setSelectStatus ]= React.useState('no')
  const [classForStatus, setClassForStatus ]= React.useState('')
  const [showEditor, setShowEditor] = React.useState(false)
  const imgURL = image_path ? image_path : no_img
  const taskStatusObj = {
    0: {message: 'task not completed'},
    1: {message: 'task not completed', edited: 'edited by admin'},
    10: {message: 'task completed'},
    11: {message: 'task completed', edited: 'edited by admin'}
  }

  React.useEffect(() => {
    if(status === 0 || status === 1) {
      setClassForStatus('task-block__status not-completed')
      setSelectStatus('no')
    } else {
      setClassForStatus('task-block__status completed')
      setSelectStatus('yes')
    }
  }, [status, selectStaus])

  const statusHandler = (e) => {
    const option = e.target.value
    dispatch(updateTaskStatus(id, token, status, option))
  }

  const showEditedByAdmin = taskStatusObj[status].edited ? 1 : 0

  const showEditorHandler = () => {
    setShowEditor(true)
  }

  const closeEditor = () => {
    setShowEditor(false)
  }

  const saveEditedText = (newText) => {
    dispatch(updateTaskTextAndStatus(id, token, status, newText))
    setShowEditor(false)
  }

  return (
    <div className="task-block">
      <div className="task-block__image">
        <img src={imgURL}alt=""/>
      </div>
      {!isAuth && <div className={classForStatus}>{taskStatusObj[status].message}</div>}
      {isAuth && <select className={classForStatus} value={selectStaus} onChange={statusHandler}>
        <option style={{backgroundColor: "red"}} value="no">task not completed</option>
        <option style={{backgroundColor: "green"}} value="yes">task completed</option>
      </select>}
      <div className="task-block__name">User name: {username}</div>
      <div className="task-block__email">User email: {email}</div>
      <div className="task-block__controler">
        <div className="task-block__controler_edited"><p style={{opacity: showEditedByAdmin}}>{taskStatusObj[status].edited}</p></div>
        <div className="task-block__controler_change">
        {isAuth && <button className="btn" onClick={showEditorHandler}>Change text</button>}
        </div>
      </div>
      {!showEditor && <div className="task-block__text">{text}</div>}
      {showEditor && <Editor text={text} closeEditor={closeEditor} saveEditedText={saveEditedText}/>}
    </div>
  )
}

export default Task