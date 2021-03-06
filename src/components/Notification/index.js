import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationMessage = useSelector(store => store.app.notification || 'no')

  const showNotification = notificationMessage !== 'no' ? 1 : 0

  return (
    <div className="message-block" style={{opacity: `${showNotification}`}}>
      <p>{notificationMessage}</p>
    </div>
  )
}

export default Notification