import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from './../../redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <div className="header">
      <div className="container">
        <NavLink to="/">
          <div className="header__title">Yes-Todo</div>
        </NavLink>
        {!isAuth && <div className="header__login"><NavLink to="/login">Login</NavLink></div>}
        {isAuth && <div className="header__login" onClick={() => dispatch(logout())} ><NavLink to="/">Logout</NavLink></div>}
      </div>
    </div>
  )
}

export default Header
