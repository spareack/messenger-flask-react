import React, {useState} from 'react'
import ProfileSettings from './profileSettings/ProfileSettings'
import NotificationSettings from './notificationSettings/NotificationSettings'
import PrivateSettings from './privateSettings/PrivateSettings'
import UISettings from './UISettings/UISettings'

import classes from './Settings.module.css'

import arrowBack from './arrowBack.svg'
import general from './general.svg'
import logout from './logout.svg'
import notifications from './notifications.svg'
import privacy from './privacy.svg'
import profile from './profile.svg'

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
            <div className={classes.backButtonPlace}>
                <button className={classes.backButton} 
                        onClick={() => (backButtonBehaivor())}>
                    <img src={arrowBack} alt=''/>
                </button> Back 
            </div>

            {buttons
            ? <div className={classes.buttons}>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(UI)}}>
                    <img height="24" width='24' src={general} style={{marginRight: 10 + 'px'}} alt=''/>
                    <p>General Settings</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PROFILE)}}>
                    <img height="24" width='24' src={profile} style={{marginRight: 10 + 'px'}} alt=''/>
                    <p>Profile Settings</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(NOTIFICATIONS)}}>
                    <img height="24" width='24' src={notifications} style={{marginRight: 10 + 'px'}} alt=''/>
                    <p>Notifications</p>
                </button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PRIVATE)}}>
                    <img height="24" width='24' src={privacy} style={{marginRight: 10 + 'px'}} alt=''/>
                    <p>Privacy</p>
                </button>
                <a href="/un_authorize" className={classes.settingButton} onClick={() => setLoggedOut(false)}>
                    <img height="24" width='24' src={logout} style={{marginRight: 10 + 'px'}} alt=''/>
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
            
        </div>
    )
}

export default Settings
