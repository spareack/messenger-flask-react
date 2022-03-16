import React, {useState} from 'react'
import {useLocation, Link} from 'react-router-dom'
import {isMobile} from 'react-device-detect'

import axios from 'axios'
import {socket} from '../../socket'
import {useDispatch} from 'react-redux'

import classes from './loginpage.module.css'
import mobile from './loginpageMobile.module.css'

const LogIn = ({setLoggedIn}) => {
    const [logPassword, setForm] = useState({
        login: '',
        password: ''
    })

    const dispatch = useDispatch()
    const [forgotSmth, setForgotsmth] = useState('')
    const location = useLocation()
    
    const login = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/authorize',
            data: {
                email: logPassword.login.trim(),
                password: logPassword.password
            },
            headers: {
                'Content-Type': 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
            }
        }).then(res => {
            if(!res.data.status){
                setLoggedIn(true)
                console.log(res.data)
                dispatch({type: 'setUser', payload: 
                    {id: res.data.id,
                    name: res.data.name,
                    photoURL: res.data.avatar_id ? res.data.avatar_id: 0,
                    dialogs: res.data.dialogs}})
                    socket.emit("authorize", {id: res.data.id})
            }
            if(res.data.status === 1){
                if(res.data.info === 'user not found'){
                    setForgotsmth('Incorrect login or password')
                }
                else setForgotsmth(res.data.info)
            }
        }).catch(error => console.log(error))
    }

    const passwordRecovery = (event) => {
        event.preventDefault()
        console.log(logPassword.password)
    }

    if(isMobile) return (
        <div className={classes.authFormDiv + ' ' + mobile.authFormDivM}>
            <form className={classes.authForm + ' ' + mobile.authFormM}>
            <h2> LogIn </h2>
                <p style={{margin: 0, padding: 0, color: '#fffff1'}}>
                    {location.state?.flash ? location.state.flash : ''}
                </p>
                <input className={classes.formInput} placeholder='Email' value={logPassword.login} onChange={(e) => setForm({...logPassword, login: e.target.value })}/>
                <input className={classes.formInput} placeholder='Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})}/>
                <p className={classes.flashMessage}>
                    {forgotSmth}
                </p>
                {/* <div className={classes.buttons}> */}
                    <button className={classes.LoginPageButton + ' ' + mobile.LoginPageButtonM} onClick={(e) => (login(e))}>Log In</button>
                    <Link to={'/m.recovery'} className={classes.LoginPageButton + ' ' + mobile.LoginPageButtonM}>Forgot password?</Link>
                {/* </div> */}

            </form>
        </div>
    )
    else return (
        <div className={classes.authFormDiv}>
            <form className={classes.authForm}>
                <h2> LogIn </h2>
                <p style={{margin: 0, padding: 0, color: '#fffff1'}}>
                    {location.state?.flash ? location.state.flash : ''}
                </p>
                <input className={classes.formInput} placeholder='Email' value={logPassword.login} onChange={(e) => setForm({...logPassword, login: e.target.value })}/>
                <input className={classes.formInput} placeholder='Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})}/>
                <p className={classes.flashMessage}>
                    {forgotSmth}
                </p>
                <div className={classes.buttons}>
                    <button className={classes.LoginPageButton} onClick={(e) => (login(e))}>Log In</button>
                    <Link to={'/recovery'} className={classes.LoginPageButton}>Forgot password?</Link>
                </div>
            </form>
        </div>
    )
}

export default LogIn;
