import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Task from './Task';
import Pagination from '../Pagination';
import { setAllPages } from '../../redux/todoReducer';
import TodoSort from './TodoSort';
import Notification from './../Notification/index';

function TodoList({tasks}) {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const token = useSelector(state => state.user.token)
  React.useEffect(() => {
    dispatch(setAllPages())
  }, [])

  const todoListRender = () => {
    return <div>
        {tasks.map(task => <Task key={task.id} isAuth={isAuth} token={token}  {...task} />)}
        <Pagination />
      </div>
  }

  const noTasksRender = () => {
    return <div className="no-todo">
      <p>There are no tasks yet</p>
    </div>
  }

  return (
    <div className="todolist">
      <Notification />
      <TodoSort/>
      {tasks.length === 0  ? noTasksRender() :todoListRender()}
    </div>
  )
}

export default TodoList