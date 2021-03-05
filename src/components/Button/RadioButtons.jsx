import React from 'react'

function RadioButtons({name,id,isCheked,onChange }) {
  return (
    <input
      checked = {isCheked}
      onChange={() => onChange(id)}
      name={name}
      type="radio"
    />
  )
}

export default RadioButtons
