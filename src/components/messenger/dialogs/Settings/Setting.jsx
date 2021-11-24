import React from 'react'
import classes from './setting.module.css'
import unnamed from './unnamed.jpg'
import arrowBack from './arrowBack.svg'
import {useSelector} from 'react-redux'

const Setting = ({setSettingsWindow}) => {
    const user = useSelector(state => state.user)
    return (
        <div className={classes.settings}>
            <div className={classes.backButtonPlace}><button className={classes.backButton} onClick={() => (setSettingsWindow(false))}><img src={arrowBack} alt=''/></button> Back to dialogs </div>
            <button className={classes.userPhoto}><img src={user.photoURL ? user.photoURL : unnamed} alt=''/></button>
        </div>
    )
}

export default Setting