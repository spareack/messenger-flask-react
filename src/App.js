import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Messenger from './messenger';
import logInPage from './components/logInPage';
import RegPage from './components/RegPage';
import {privateRoutes, publicRoutes} from './routes'

function App() {
  const [currentDialog, setCurrentDialog] = useState(0)

  /* Dev Test Time */
  const user = true; 
  const dialogs = [
    {id: 1, name: 'spareack', talks: [{id: 1, name:'о мессенджере'}, {id:2, name: 'что?'}]}, 
    {id: 2, name: 'zxchrnk', talks: [{id: 1, name:'Учёба сраная'}, {id: 2, name: 'DimAss лоХ'}]}
]
  /* Dev Test Time */

  return (
    <BrowserRouter>
      {user ? 
      (
        <Switch>
          <Route key={'/talk'} exact={true} path={'/talk'} component={() =>( <Messenger dialogs={dialogs}/>)} />
          {/*privateRoutes.map( ({path, Component}) => 
            <Route key={path} exact={true} path={path} component={Component} />
          )*/}
           <Redirect to={'/talk'} />
        </Switch>
      )
      :
      (
        <Switch>
          <Route key={'/registration'} exact={true} path={'/registration'} component={RegPage} />
          <Route key={'/login'} exact={true} path={'/login'} component={logInPage} />
          {/*publicRoutes.map( ({path, Component}) => 
            <Route key={path} exact={true} path={path} component={Component} />
           )*/}
           <Redirect to={'/login'} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
