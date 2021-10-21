import React, {useState} from 'react'
import './styles/loginpage.css'
import RegPage from './RegPage'
import {Link, Redirect} from 'react-router-dom'


const LogInPage = () => {
    const [logPassword, setForm] = useState({
        login: '',
        password: ''
    })

    const login = (event) => {
        event.preventDefault()
        console.log(logPassword.login)
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
                    <input class='form-input' placeholder='Email' value={logPassword.login} onChange={(e) => setForm({...logPassword, login: e.target.value })}></input>
                    <input class="form-input" placeholder='Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})}></input>
                    <div className='buttons'>
                        <button className="LoginPageButton" onClick={login}>Log In</button>
                        <button className="LoginPageButton" onClick={passwordRecovery}>Forgot password?</button>
                    </div>
                </form>
                <div className='loginPageAvatar'>
                    <div className='loginLogo'><img src alt='logo'/></div>
                    <div className='loginPageText'>
                        <p>Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!</p>
                        <a href="/registration" className='LoginPageButton ButtonText'>Register now!</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;
