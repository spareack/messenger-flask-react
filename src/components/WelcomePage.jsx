import React, {useState, /*useEffect*/} from 'react'
import { Route, Link, Redirect, /*useLocation*/ } from 'react-router-dom'
import RegPage from './RegPage'
import LogIn from './logInPage'
import "./styles/loginpage.css"
import Particles from 'react-particles-js'
import params from './particlesParams'
import logo from '../logo.png'

const WelcomePage = ({setUser, setUserInfo}) => {
    const [flashMsg, setFlashMsg] = useState('')
    // const [particle, setParticles] = useState(params.particles)
    // const location = useLocation()

    // useEffect(() => {
    //     if(location.pathname === '/login'){
    //         setParticles(params.particles)
    //     } else if(location.pathname === '/registration') {
    //         setParticles(params.particles)
    //     }
    // }, [location.pathname])
    return (
        <div>
            <div className='loginPage'>
            <Particles  className="particlesDiv" 
                        params={params.particles}/>
                <Route key={'/registration'} exact={true} path={'/registration'} component={() => (<RegPage setFlash={setFlashMsg}/>)} />
                <Route key={'/login'} exact={true} path={'/login'} component={() => (<LogIn setLoggedIn={setUser} setFlash={setFlashMsg} flash={flashMsg} setUser={setUserInfo}/>)}/>
                <div className='loginPageAvatar'>
                    <div className='loginLogo'><img src={logo} height='180' alt='logo'/></div>
                    <div className='loginPageText'>
                        <p>Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!</p>
                        <Link to={'/registration'} className='LoginPageButton ButtonText regButton'>Register now!</Link>
                    </div>
                </div>
            </div>
            <Redirect to={'/login'} />
        </div>
    )
}

export default WelcomePage
