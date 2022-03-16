import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import axios from 'axios'

import classes from './passwordRecover.module.css'
import mobile from './loginpageMobile.module.css'

const PasswordRecoveryPage = () => {
    const [email, setEmail] = useState('')

    const passwordRecovery = () => {
        axios({
            method: 'POST',
            url: '/reset_password',
            data: {
                email: email
            }
        })
    }

    if(isMobile) return (
        <div className={mobile.recoveryPage}>
            <div className={classes.recoveryFormItem}>
                <h2>Enter your e-mail</h2>
                <input value={email} onChange={e => setEmail(e.target.value)} className={classes.formInput} placeholder='Email'></input>
                <div className={isMobile ? mobile.buttonsM : classes.buttons}>
                    <button onClick={passwordRecovery} className={mobile.LoginPageButtonM + ' ' + classes.LoginPageButton}>
                        Continue
                    </button>
                    <Link to={isMobile ? '/m.login' : '/login'} className={mobile.LoginPageButtonM + ' ' + classes.LoginPageButton}>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    )

    else return (
        <div className={classes.recoveryPage}>
            <div className={classes.recoveryFormItem}>
                <h2>Enter your e-mail</h2>
                <input value={email} onChange={e => setEmail(e.target.value)} className={classes.formInput} placeholder='Email'></input>
                <div className={classes.buttons}>
                    <button onClick={passwordRecovery} className={classes.LoginPageButton}>
                        Continue
                    </button>
                    <Link to={isMobile ? '/m.login' : '/login'} className={classes.LoginPageButton}>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PasswordRecoveryPage
