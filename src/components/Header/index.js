import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from './../../redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../redux/appReducer';

function Header() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  const clearMessage = () => {
    dispatch(clearNotification())
  }

  return (
    <div className="header">
      <div className="container">
        <NavLink to="/" onClick={clearMessage}>
          <div className="header__title">Yes-Todo</div>
        </NavLink>
        {!isAuth && <div className="header__login" onClick={clearMessage}><NavLink to="/login">Login</NavLink></div>}
        {isAuth && <div className="header__login" onClick={logoutHandler} ><NavLink to="/">Logout</NavLink></div>}
      </div>
    </div>
  )
}

export default Header
