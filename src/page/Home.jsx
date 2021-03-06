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
    // eslint-disable-next-line
  }, [currentPage, sortField, sortDirection])

  const tasksOnPage = tasks.slice(0, 3)

  const tasksRender = () => {
    return !loading
            ? <TodoList tasks={tasksOnPage}/>
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
