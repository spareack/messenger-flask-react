import React from 'react'
import classes from './styles/setting.module.css'
import unnamed from './unnamed.jpg'
import arrowBack from './arrowBack.svg'

const Setting = ({user, setSettingsWindow}) => {
    return (
        <div className={classes.settings}>
            <div className={classes.backButtonPlace}><button className={classes.backButton} onClick={() => (setSettingsWindow(false))}><img src={arrowBack}/></button> Back to dialogs </div>
            <button className={classes.userPhoto}><img src={user.photoURL ? user.photoURL : unnamed}/></button>
            
        </div>
    )
}

export default Setting
