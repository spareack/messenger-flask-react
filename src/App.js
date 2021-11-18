import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Messenger from './messenger';
import Loader from './components/Loader';
import WelcomePage from './components/WelcomePage';
import { io } from 'socket.io-client'

function App() {

  const [userIsLoggedIn, setUserLoggedIn] = useState('loading')
  const [user, setUser] = useState({
    id: -1,
    name: 'none',
    photoURL: 0,
    dialogs: []
  })

   useEffect(() => {
    const socket = io('http://localhost:5000');
    
    axios({
      method: 'get',
      url: '/is_authorized',
    }).then(res => {
        if(res.data.status === 0){
            setUserLoggedIn(res.data.is_auth)
            setUser({
              id: res.data.id,
              name: res.data.name,
              dialogs: res.data.dialogs ? res.data.dialogs : []
            })
            console.log(res.data)
        }
    }).catch(error => console.log(error))

    if (userIsLoggedIn === true) {
      socket.emit('authorize', {id: user.id});
      alert('aaa')
    }

    socket.on('info', msg => {
      alert(msg);
    });

//     socket.on('alert', msg => {
//       alert(msg);
////       socket.emit('test', 'xxx');
//     });
//      socket.emit('authorize', {'id': 2});

   }, []);


    
    
  if(userIsLoggedIn === 'loading'){
    return (<div style={{height: '100vh',
                        backgroundColor: 'black'}}><Loader/></div>)
  } else return (
    <BrowserRouter>
      {userIsLoggedIn ? 
      (
        <Switch>
          <Route key={'/talk'} exact={true} path={'/talk'} component={() =>( <Messenger dialogs={user.dialogs} setLoggedOut={setUserLoggedIn} user={user}/>)} />
           <Redirect to={'/talk'} />
        </Switch>
      )
      :
      (
        <Switch>
          <WelcomePage setUser={setUserLoggedIn} setUserInfo={setUser}/>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
