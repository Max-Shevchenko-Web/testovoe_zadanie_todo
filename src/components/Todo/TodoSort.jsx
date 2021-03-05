import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSortField, setSortDirection } from '../../redux/todoReducer';
import Button from './../Button/Button';
import Popup from './../Popup/index';
import { setShowPopup } from '../../redux/appReducer';

function TodoSort() {
  const dispatch = useDispatch()
  const {sortField, sortDirection} = useSelector(state => ({
    sortField: state.todo.sortField,
    sortDirection: state.todo.sortDirection
  }))

  const showPopup = () => {
    dispatch(setShowPopup('flex'))
  }

  return (
    <div className="todo-select">
      <Button onClick={showPopup}>Create new task</Button>
      <select value={sortField} onChange={(e) => dispatch(setSortField(e.target.value))}>
        <option value="username">by username</option>
        <option value="id">by id</option>
        <option value="email">by email</option>
        <option value="status">by status</option>
      </select>
      <select value={sortDirection} onChange={(e) => dispatch(setSortDirection(e.target.value))}>
        <option value="asc">by asc</option>
        <option value="desc">by desc</option>
      </select>
      <Popup/>
    </div>
  )
}

export default TodoSort
