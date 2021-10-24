import React, {useState, useEffect} from 'react'
import axios from 'axios'

const RegPage = () => {
    const [logPassword, setForm] = useState({
        name: '',
        age: '',
        login: '',
        password: '',
        password2: ''
    })
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const send = (event) => {
        event.preventDefault()
        
    }

    return (
        <div className='loginPage'>
            <div className='loginForm' style={{height: '600px'}}>
                <form className="authForm regForm " method='POST'>
                    <h2> Registration </h2>
                    <input class='form-input' placeholder='Your nickname' value={logPassword.name} onChange={(e) => setForm({...logPassword, name: e.target.value })} required></input>
                    <input class="form-input" placeholder='Your age' value={logPassword.age} onChange={(e) => setForm({...logPassword, age: e.target.value})} required></input>
                    <input class="form-input" placeholder='Your Email' value={logPassword.login} onChange={(e) => (setForm({...logPassword, login: e.target.value}))} required={true} style={{color: re.test(String(logPassword.login).toLowerCase()) && logPassword.login !== '' ? '#5E6472' : 'red'}}></input>
                    <input class="form-input" placeholder='Your Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})} required={true}></input>
                    <input class="form-input" placeholder='Repeat password' type='password' value={logPassword.password2} onChange={(e) => setForm({...logPassword, password2: e.target.value})} required={true}></input>
                    <p style={{color: 'black', marginBottom: '0'}}>Пароль не короче 8 символов.</p>
                    {(logPassword.password !== logPassword.password2 || (logPassword.password === '' && logPassword.password2 === '')) 
                        ? <p style={{color: 'red', marginBottom: '0'}}>Пароли должны совпадать!</p> 
                        : <p style={{color: 'green', marginBottom: '0'}}>Пароли совпадают</p>}
                    <div className="buttons">
                        <button className="LoginPageButton" 
                        style={{margin: '2%',                                  
                                width: '100%', 
                                padding: '15px'}} 
                                type='submit'
                                onClick={send}
                                disabled={(logPassword.password !== logPassword.password2 || (logPassword.password === '' && logPassword.password2 === '') || 
                                (logPassword.name === '') || logPassword.age < 12) || 
                                !re.test(String(logPassword.login).toLowerCase()) ||
                                logPassword.password.length < 8}>Register now</button>
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

export default RegPage
