import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import TodoList from '../components/Todo/TodoList'
import { getTasks } from './../actions/tasks';
import Loader from './../components/Loader/index';

function Home() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.todo.tasks)
  const loading = useSelector(state => state.app.loader)
  const currentPage = useSelector(state => state.todo.currentPage)
  const sortField = useSelector(state => state.todo.sortField)
  const sortDirection = useSelector(state => state.todo.sortDirection)

  useEffect(() => {
    dispatch(getTasks(sortField, sortDirection, currentPage))
  }, [currentPage, sortField, sortDirection])


  const tasksRender = () => {
    return !loading
            ? <TodoList tasks={tasks}/>
            : null
  }

  return (
    <div className="home">
      {loading && <Loader />}
      {tasksRender()}
    </div>
  )
}

export default Home
