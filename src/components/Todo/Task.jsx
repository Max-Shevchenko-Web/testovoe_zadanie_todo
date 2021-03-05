import React from 'react'
import no_img from '../../assets/img/no-img.png'

function Task({id, image_path, username, email, text, status}) {
  const imgURL = image_path ? image_path : no_img
  const taskStatusObj = {
    0: 'task not completed',
    1: 'task not completed, edited by admin',
    10: 'task completed',
    11: 'task edited by admin and completed'
  }

  const classForStatus = () => {
    if(status === 0 || status === 1) {
      return 'task-block__status not-completed'
    }
    return 'task-block__status completed'
  }

  return (
    <div className="task-block">
      <div className="task-block__image">
        <img src={imgURL}alt=""/>
      </div>
      <div className={classForStatus()}>{taskStatusObj[status]}</div>
      <div className="task-block__name">User name: {username}</div>
      <div className="task-block__email">User email: {email}</div>
      <div className="task-block__text">{text}</div>
    </div>
  )
}

export default Task