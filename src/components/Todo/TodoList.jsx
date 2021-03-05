import React from 'react'
import {useDispatch} from "react-redux";
import Task from './Task';
import Pagination from '../Pagination';
import { setAllPages } from '../../redux/todoReducer';
import TodoSort from './TodoSort';

function TodoList({tasks}) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setAllPages())
  }, [])

  const todoListRender = () => {
    return <div>
        {tasks.map(task => <Task key={task.id}  {...task} />)}
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
      <TodoSort/>
      {tasks.length === 0  ? noTasksRender() :todoListRender()}
    </div>
  )
}

export default TodoList