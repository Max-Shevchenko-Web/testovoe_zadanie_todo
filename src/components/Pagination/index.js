import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Button from './../Button/Button';
import { incrementCurrentPage, decrementCurrentPage, setCurrentPage } from '../../redux/todoReducer';
import RadioButtons from './../Button/RadioButtons';

function Pagination() {
  const dispatch = useDispatch()
  const allPages = useSelector(state => state.todo.allPages)
  const currentPage = useSelector(state => state.todo.currentPage)
  const paginationArray = useSelector(state => state.todo.paginationArray)

  const increasecurrentPage = () => {
    dispatch(incrementCurrentPage())
  }

  const reducecurrentPage = () => {
    dispatch(decrementCurrentPage())
  }

  const setPage = (item) => {
    dispatch(setCurrentPage(item))
  }

  return (
    <div  className="pagination">
      <div className="pagination__radio-button">
        {paginationArray&&paginationArray.map(item => {
          const isCheked = item === currentPage ? true : false
          return <RadioButtons
            key={item}
            name="pagination"
            isCheked={isCheked}
            onChange={setPage}
            id = {item}
          />
        })}
      </div>
      <div className="pagination__block">
        <Button onClick={reducecurrentPage} disabled={currentPage === 1}>-</Button>
        <div>Page {currentPage} of {allPages}</div>
        <Button onClick={increasecurrentPage} disabled={currentPage  === allPages} >+</Button>
      </div>
    </div>
  )
}

export default Pagination
