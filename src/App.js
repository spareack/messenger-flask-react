import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Messenger from './messenger';
import LogInPage from './components/logInPage';
import RegPage from './components/RegPage';
// import {privateRoutes, publicRoutes} from './routes'

function App() {
  const [currentDialog, setCurrentDialog] = useState(0)
  

  /* Dev Test Time */
  const [user, setUser] = useState(false)
  const dialogs = [
    {id: 1, name: 'spareack', photoURL: undefined, talks: [{id: 1, name:'о мессенджере'}, {id:2, name: 'что?'}, {id: 3, name:'хи хи'}]}, 
    {id: 2, name: 'zxchrnk', photoURL: undefined, talks: [{id: 1, name:'Учёба сраная'}, {id: 2, name: 'Дима крутой'}]}
]
  /* Dev Test Time */

  return (
    <BrowserRouter>
      {user ? 
      (
        <Switch>
          <Route key={'/talk'} exact={true} path={'/talk'} component={() =>( <Messenger dialogs={dialogs} setLoggedOut={setUser}/>)} />
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
          <Route key={'/login'} exact={true} path={'/login'} component={() => (<LogInPage setLoggedIn={setUser}/>)}/>
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
