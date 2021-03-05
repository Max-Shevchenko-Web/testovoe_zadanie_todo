import React from 'react'

function Button({onClick, disabled, children}) {
  return (
    <button disabled={disabled} className="btn" onClick={onClick}>{children}</button>
  )
}

export default Button
