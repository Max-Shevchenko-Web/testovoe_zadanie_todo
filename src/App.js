import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from './page/Login'
import Home from './page/Home'
import Header from './components/Header/index';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './actions/user';

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(auth())
  // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        {!isAuth ?
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login}/>
              <Redirect to="/"/>
            </Switch>
            :
            <Switch>
              <Route path="/" component={Home} exact />
              <Redirect to="/"/>
            </Switch>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;