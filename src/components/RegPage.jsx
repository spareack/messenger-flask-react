import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { isMobile, mobileModel } from 'react-device-detect'

import axios from 'axios'

import classes from '../styles/loginpage.module.css'
import mobile from '../styles/loginpageMobile.module.css'

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegPage = ({setFlash}) => {
    const [logPassword, setForm] = useState({
        name: '',
        age: '',
        login: '',
        password: '',
        password2: ''
    })

    const [nameValid, setNameValid] = useState({
        length: false,
        nameIsOccupied: false
    })

    const [warning, setWarning] = useState('')
    
    const history = useHistory()

    const checkName = event => {
        setForm({...logPassword, name: event.target.value})
        axios({
            method: 'get',
            url: '/check_name',
            params: {
                userName: event.target.value
            },
            headers: {
                'Content-Type': 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
            }
        }).then(res => {
            setNameValid({...nameValid, nameIsOccupied: res.data.status})
        }).catch(error => alert(error))
    }


    const send = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: '/register_new_user',
            // onUploadProgress: () => {
            //     history.push({pathname: '/login', state: {flash: 'Confirm your mail and Log in'}})
            // },
            data: {
                userName: logPassword.name,
                email: logPassword.login,
                password: logPassword.password,
                age: logPassword.age
              },
            headers: {
                'Content-Type': 'application/json'
                //'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
            }
        }).then(res => {
            let data = res.data
            if (data.status === 1) {
                setWarning('Name or email already engaged')
            }
            if (data.status === 0) {
                history.push({pathname: '/login', state: {flash: 'Confirm your mail and Log in'}})
                setFlash('Confirm your mail and Log in')
            }   
            setFlash(data.info)
        }).catch(error => console.log(error))
}   

    return (
        <form className={
            isMobile 
            ? classes.authForm + ' ' + classes.regForm + ' ' + mobile.authFormM 
            : classes.authForm + ' ' + classes.regForm} 
            method='POST'>
            <h2> Registration </h2>
                {warning}
                <input className={classes.formInput} placeholder='Your nickname' value={logPassword.name} onChange={checkName} required style={{color: nameValid.nameIsOccupied || logPassword.name.length > 19 ? 'red' : '#5E6472'}}></input>
                <input className={classes.formInput} placeholder='Your age' value={logPassword.age} onChange={(e) => setForm({...logPassword, age: e.target.value})} required style={{color: logPassword.age < 12 || logPassword.age > 110 ? '#cc0000' : "#5E6472"}}></input>
                <input className={classes.formInput} placeholder='Your Email' value={logPassword.login} onChange={(e) => (setForm({...logPassword, login: e.target.value}))} required={true} style={{color: re.test(String(logPassword.login).toLowerCase()) && logPassword.login !== '' ? '#5E6472' : 'red'}}></input>
                <input className={classes.formInput} placeholder='Your Password' type='password' value={logPassword.password} onChange={(e) => setForm({...logPassword, password: e.target.value})} required={true}></input>
                <input className={classes.formInput} placeholder='Repeat password' type='password' value={logPassword.password2} onChange={(e) => setForm({...logPassword, password2: e.target.value})} required={true}></input>
                <p style={{color: '#fffff0', marginBottom: '0'}}>
                    {nameValid.nameIsOccupied 
                    ? 'This name is already taken' 
                    : "Password contains at least 8 characters "}
                </p>
                {(logPassword.password !== logPassword.password2 
                || (logPassword.password === '' && logPassword.password2 === '')) 
                    ? <p style={{color: 'red', marginBottom: '0'}}>Password mismatch!</p> 
                    : <p style={{color: 'green', marginBottom: '0'}}>Password match</p>}
                <div className={classes.buttons}>
                    <Link to={'/login'} className={classes.LoginPageButton} 
                    style={{margin: '2%',                                  
                            width: '100%', 
                            padding: '15px'}} 
                            type='submit'
                            onClick={send}
                            disabled={
                                (logPassword.password !== logPassword.password2 || (logPassword.password === '' && logPassword.password2 === '') 
                                || (logPassword.name === '') 
                                || logPassword.age < 12) 
                                || !re.test(String(logPassword.login).toLowerCase()) 
                                || logPassword.password.length < 8 
                                || nameValid.nameIsOccupied 
                                || logPassword.name.length > 19}>Register now</Link>
                </div>
        </form>
    )
}

export default RegPage
