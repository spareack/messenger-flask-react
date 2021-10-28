import React, {useState, useEffect} from 'react'
import './styles/loginpage.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


const LogInPage = ({setLoggedIn}) => {
    const [logPassword, setForm] = useState({
        login: '',
        password: ''
    })

    const [currentTime, setTime] = useState(null)

    useEffect( () => {
        fetch('/text').then(res => res.text()).then(res => setTime(res))
    }, [])

    useEffect( () => {
        axios.get('/text').then(res => console.log(res)).catch(res => console.log(res))
    }, [])

    const login = (event) => {
        event.preventDefault()
        console.log(logPassword.login)
        setLoggedIn(true)
    }

    const passwordRecovery = (event) => {
        event.preventDefault()
        console.log(logPassword.password)
    }

    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <form className="authForm">
                    <h2> LogIn </h2>
                    <input className='form-input' placeholder='Email' value={logPassword.login} onChange={(e) => setForm({...logPassword, login: e.target.value })}></input>
                    <input className="form-input" placeholder='Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})}></input>
                    <div className='buttons'>
                        <button className="LoginPageButton" onClick={login}>Log In</button>
                        <button className="LoginPageButton" onClick={passwordRecovery}>Forgot password?</button>
                    </div>
                </form>
                <div className='loginPageAvatar'>
                    <div className='loginLogo'><img src alt='logo'/></div>
                    <div className='loginPageText'>
                        <p>Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register! {currentTime}</p>
                        <Link to={'/registration'} className='LoginPageButton ButtonText'>Register now!</Link>
                        {/*<a href="/registration" className='LoginPageButton ButtonText'>Register now!</a>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;
