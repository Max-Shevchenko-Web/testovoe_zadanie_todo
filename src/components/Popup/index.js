import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShowPopup } from '../../redux/appReducer'
import { createNewTask } from '../../actions/tasks';
import TextArea from './../../util/textArea/TextArea';

export const useDisableBodyScroll = (open) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
};

function Popup() {
  const dispatch = useDispatch()
  const popupDisplay = useSelector(state => state.app.popupDisplay)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [usernameDirty, setUsernameDirty] = useState(false)
  const [textDirty, setTextDirty] = useState(false)
  const [usernameError, setUsernameError] = useState('username cannot be empty')
  const [emailError, setEmailError] = useState('email cannot be empty')
  const [textError, setTextError] = useState('text cannot be empty')
  const [formValid, setFormValid] = useState(false)


  React.useEffect(() => {
    if(usernameError||emailError||textError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [usernameError, emailError, textError])

  useDisableBodyScroll(popupDisplay==='flex')

  const popupClose = () => {
    dispatch(setShowPopup('none'))
    clearPopup()
  }

  const clearPopup = () => {
    setUsername('')
    setEmail('')
    setText('')
    setEmailDirty(false)
    setUsernameDirty(false)
    setTextDirty(false)
    setUsernameError('username cannot be empty')
    setEmailError('email cannot be empty')
    setTextError('text cannot be empty')
    setFormValid(false)
  }

  const createTask = () => {
    dispatch(createNewTask(username, email, text, popupClose))
  }

  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'email':
            setEmailDirty(true)
            break
      case 'username':
            setUsernameDirty(true)
            break
      case 'text':
            setTextDirty(true)
            break
      default: return ''
    }
  }

  const emailHandler = (e) => {
    let email = e.target.value
    setEmail(email)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(email.length  === 0) {
      setEmailError('email cannot be empty')
    } else if(!re.test(String(email).toLowerCase())) {
      setEmailError('incorrect email')
    } else {
      setEmailError('')
    }
  }

  const usernameHandler = (e) => {
    let username = e.target.value
    setUsername(username)
    if(username.length  === 0) {
      setUsernameError('username cannot be empty')
    } else if(username.trim().length  === 0) {
      setUsernameError('username cannot contain only spaces')
    } else {
      setUsernameError('')
    }
  }

  const textHandler = (e) => {
    setText(e.target.value)
    if(text.length  === 0) {
      setTextError('text cannot be empty')
    } else if(text.trim().length  === 0) {
      setUsernameError('text cannot contain only spaces')
    } else {
      setTextError('')
    }
  }

  return (
    <div className="popup" onClick={popupClose} style={{display: popupDisplay}}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__header">
            <div className="popup__title">Create a new task</div>
            <button className="popup__close" onClick={() => popupClose()}>X</button>
        </div>
        {(usernameDirty && usernameError) && <div style={{color:"red"}}>{usernameError}</div>}
        <input onBlur={blurHandler} name='username' type="text" placeholder="Enter username..." value={username} onChange={usernameHandler}/>
        {(emailDirty && emailError) && <div style={{color:"red"}}>{emailError}</div>}
        <input onBlur={blurHandler} name='email' type="text" placeholder="Enter email..." value={email} onChange={emailHandler}/>
        {(textDirty && textError) && <div style={{color:"red"}}>{textError}</div>}
        <TextArea  onBlur={blurHandler} name='text'  placeholder="Enter task text..." value={text} onChange={textHandler} />
        <button className="popup__create" disabled={!formValid} onClick={createTask}>Create</button>
      </div>
    </div>
  )
}

export default Popup