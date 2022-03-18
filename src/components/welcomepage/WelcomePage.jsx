import React, {useState, /*useEffect*/} from 'react'
import { Route, Link, Redirect, /*useLocation*/ } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import RegPage from './RegPage'
import LogIn from './logInPage'
import Particles from 'react-particles-js'
import PasswordRecoveryPage from './passwordRecoveryPage'

import classes from "./loginpage.module.css"
import mobile from "./loginpageMobile.module.css"

import params from '../particlesParams'
import logo from '../images/logo.png'

const WelcomePage = ({setUser /*, setUserInfo*/}) => {
    const [flashMsg, setFlashMsg] = useState('')

    if (isMobile) {
        return (
            <div className={mobile.loginPage}>
                <header className={mobile.header}>
                    <img src={logo} height={'100%'}/>
                </header>
                <Route key={'/m.login'} exact={true} path={'/m.login'} component={() => <LogIn setLoggedIn={setUser} setFlash={setFlashMsg} flash={flashMsg}/>}/>
                <Route key={'/m.registration'} exact={true} path={'/m.registration'} component={() => <RegPage setFlash={setFlashMsg}/>} />
                <Route key={'/m.recovery'} exact={true} path={'/m.recovery'} component={() => <PasswordRecoveryPage/>}/>
                <Redirect to={'/m.login'} />
                <div className={mobile.registrationBlock}>
                    <p>Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register now!</p>
                    <Link className={classes.LoginPageButton + ' ' + mobile.LoginPageButtonM} to={'/m.registration'}>Register</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={classes.loginPage}>
                <Particles  className={classes.particlesDiv} 
                            params={params.particles}/>
                    <Route key={'/registration'} exact={true} path={'/registration'} component={() => (<RegPage setFlash={setFlashMsg}/>)} />
                    <Route key={'/login'} exact={true} path={'/login'} component={() => (<LogIn setLoggedIn={setUser} setFlash={setFlashMsg} flash={flashMsg}/>)}/>
                    <Route key={'/recovery'} exact={true} path={'/recovery'} component={() => <PasswordRecoveryPage/>}/>
                    <div className={classes.loginPageAvatar}>
                        <div className={classes.loginLogo}><img src={logo} height='180' alt='logo'/></div>
                        <div className={classes.loginPageText}>
                            <p>Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register now!</p>
                            <Link to={'/registration'} className={classes.LoginPageButton + ' ' + classes.ButtonText + ' ' + classes.regButton}>Register now!</Link>
                        </div>
                    </div>
                </div>
                <Redirect to={'/login'} />
            </div>
    )}
}

export default WelcomePage
