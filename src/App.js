import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Messenger from './messenger';
import logInPage from './components/logInPage';
import {privateRoutes, publicRoutes} from './routes'

function App() {
  const [currentDialog, setCurrentDialog] = useState(0)
  const user = false;

  return (
    <BrowserRouter>
      {user ? 
      (
        <Switch>
          {privateRoutes.map( ({path, Component}) => 
            <Route key={path} exact={true} path={path} component={Component} />
           )}
           <Redirect to={'/talk'} />
        </Switch>
      )
      :
      (
        <Switch>
          {publicRoutes.map( ({path, Component}) => 
            <Route key={path} exact={true} path={path} component={Component} />
           )}
           <Redirect to={'/login'} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
