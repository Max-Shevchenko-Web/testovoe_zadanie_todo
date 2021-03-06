import React from 'react'
import './textArea.scss'

function TextArea({
  onBlur, name, placeholder = '',
  value, onChange
}) {

  return (
    <textarea
      className="textarea_custom"
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength="150"
    />
  )
}

export default TextArea
