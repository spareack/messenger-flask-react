import React, {useState} from 'react'
import ProfileSettings from './profileSettings/ProfileSettings'
import NotificationSettings from './notificationSettings/NotificationSettings'
import PrivateSettings from './privateSettings/PrivateSettings'
import UISettings from './UISettings/UISettings'
import classes from './Settings.module.css'
import arrowBack from './arrowBack.svg'

const Settings = ({setSettingsWindow}) => {
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
            <div className={classes.backButtonPlace}><button className={classes.backButton} onClick={() => (backButtonBehaivor())}><img src={arrowBack} alt=''/></button> Back </div>

            {buttons
            ? <div className={classes.buttons}>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(UI)}}>General Settings</button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PROFILE)}}>Profile Settings</button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(NOTIFICATIONS)}}>Notifications</button>
                <button className={classes.settingButton} onClick={() => {setButtons(false); setSetting(PRIVATE)}}>Privacy</button>
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
                        return <div>Чё бля?</div>
                }             
            })(settings)
        }
            
        </div>
    )
}

export default Settings
