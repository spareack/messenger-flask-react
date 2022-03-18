import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import axios from 'axios'

import Messenger from './messenger'
import Loader from './components/Loader'
import WelcomePage from './components/welcomepage/WelcomePage'

import './App.css'

function App() {
    const dispatch = useDispatch()
    const [userIsLoggedIn, setUserLoggedIn] = useState('loading')

    useEffect( () => {    
        axios({
            method: 'get',
            url: '/is_authorized',
        }).then(res => {
            if(res.data.status === 0){
                setUserLoggedIn(res.data.is_auth)
                dispatch({type: 'setUser', payload: {
                    id: res.data.id,
                    name: res.data.name,
                    dialogs: res.data.dialogs ? res.data.dialogs : [],
                    photoURL: res.data.avatar_id
                }})
            }
        }).catch(error => console.log(error))
    }, [dispatch])

    
    if (userIsLoggedIn === 'loading') {
        return (
            <div style={{height: '100vh', backgroundColor: 'black'}}>
                <Loader />
            </div>
        )
    } else return (
        <BrowserRouter>
          {userIsLoggedIn 
          ?(
              <Switch>
                  <Route key={'/talk'} exact={true} path={'/talk'} component={() =>( <Messenger setLoggedOut={setUserLoggedIn} active={!(userIsLoggedIn === 'loading')}/>)} />
                  <Redirect to={'/talk'} />
              </Switch>
          )
          :(
              <Switch>
                  <WelcomePage setUser={setUserLoggedIn}/>
              </Switch>
          )}
        </BrowserRouter>
    )
}

export default App