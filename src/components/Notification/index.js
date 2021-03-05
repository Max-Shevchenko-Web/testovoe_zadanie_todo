import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationMessage = useSelector(store => store.app.message)

  if (notificationMessage === null) {
    return null
  }

  return (
    <div className="message-block">
      <p>{notificationMessage}</p>
    </div>
  )
}

export default Notification