import React, {useState} from 'react'
import { isMobile } from 'react-device-detect'
import ProfileSettings from './ProfileSettings'
import NotificationSettings from './NotificationSettings'
import PrivateSettings from './PrivateSettings'
import UISettings from './UISettings'

import classes from '../styles/Settings.module.css'

import arrowBack from '../assets/arrowBack.svg'
import general from '../assets/general.svg'
import logout from '../assets/logout.svg'
import notifications from '../assets/notifications.svg'
import privacy from '../assets/privacy.svg'
import profile from '../assets/profile.svg'

const Settings = ({setSettingsWindow, setLoggedOut}) => {
    const [buttons, setButtons] = useState(true) 
    const [settings, setSetting] = useState('Global')

    const NOTIFICATIONS = 'Notifications'
    const UI = 'UI'
    const PROFILE = 'Profile'
    const PRIVATE = 'Private'

    const backButtonBehaivor = () => {
        buttons 
        ? setSettingsWindow(false)
        : setButtons(true)
        
    }
    return (
        <div className={classes.settings}>
            {!isMobile 
            ? <div className={classes.backButtonPlace}>
                <button className={classes.backButton} 
                        onClick={() => (backButtonBehaivor())}>
                    <img src={arrowBack} alt=''/>
                </button> Back 
            </div>
            : ''}

            {buttons
            ? <div className={classes.buttons}>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(UI)}}>
                    <img src={general} alt=''/>
                    <p>General Settings</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PROFILE)}}>
                    <img src={profile} alt=''/>
                    <p>Profile Settings</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(NOTIFICATIONS)}}>
                    <img src={notifications} alt=''/>
                    <p>Notifications</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PRIVATE)}}>
                    <img src={privacy} alt=''/>
                    <p>Privacy</p>
                </button>
                <a href="/un_authorize" className={classes.settingButton} onClick={() => setLoggedOut(false)}>
                    <img src={logout} alt=''/>
                    <p>Log Out</p>
                </a>
            </div>
            :((settings) => {
                switch(settings){
                    case 'Global':
                        return <div>Settings!</div>
                    case PROFILE:
                        return <ProfileSettings />
                    case NOTIFICATIONS:
                        return <NotificationSettings />
                    case PRIVATE:
                        return <PrivateSettings />
                    case UI:
                        return <UISettings />
                    default:
                        return <div>Чё блин ты чё совсем долбанутый? ты как сюда попал?</div>
                }             
            })(settings)
        }
        {isMobile && !buttons
        ?<div className={classes.mobileButton}>
            <button onClick={() => {setButtons(true)}} className={classes.settingButton}>Back</button>
        </div>
        :''}
        </div>
    )
}

export default Settings
