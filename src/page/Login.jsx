import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import { login } from './../actions/user';
import Notification from '../components/Notification';


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const loginHendler = () => {
    dispatch(login(username, password))
  }

  const keyEnter = e => {
    if (e.key === 'Enter') {
      dispatch(login(username, password))
    }
  }

  return (
    <div className='authorization' onKeyPress={keyEnter}>
      <Notification/>
      <div className="authorization__header">Login</div>
      <input
        onChange={(event)=> setUsername(event.target.value)}
        value={username}
        type="text"
        placeholder="Enter your username ..."
      />
      <input
        onChange={(event)=> setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="Enter password..."
      />
      <button className="authorization__btn" onClick={loginHendler}>Login</button>
    </div>
  )
}

export default Login
