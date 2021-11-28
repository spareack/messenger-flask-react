import React, {useState} from 'react'
import classes from './profileSetting.module.css'
import unnamed from './unnamed.jpg'
import {useSelector} from 'react-redux'

const ProfileSettings = ({setSettingsWindow}) => {
    const user = useSelector(state => state.user)
    const [settingsForm, setSettings] = useState({
        name: user.name,
        password1: '',
        password2: '',
        bio: user.bio
    })


    return (
        <div className={classes.ProfileSettings}>
            <button className={classes.userPhoto}><img src={user.photoURL ? user.photoURL : unnamed} alt=''/></button>
            <div className={classes.ProfileSettingsField}>
                <div className={classes.inputBox}>
                    <input name='settingsName' type="text" className={classes.profileInput} required value={settingsForm.name} onChange={(e) => setSettings({...settingsForm, name: e.target.value})}/>
                    <label htmlFor="settingsName" className={classes.settingsLabel}>Username (required)</label>
                </div>
                <div className={classes.inputBox}>
                    <input name='settingsPassword1' type="password" className={classes.profileInput} required value={settingsForm.password1} onChange={(e) => setSettings({...settingsForm, password1: e.target.value})}/>
                    <label htmlFor="settingsPassword1" className={classes.settingsLabel}>Password</label>
                </div>
                <div className={classes.inputBox}>
                    <input name='settingsPassword2' type="password" className={classes.profileInput} required value={settingsForm.password2} onChange={(e) => setSettings({...settingsForm, password2: e.target.value})}/>
                    <label htmlFor="settingsPassword2" className={classes.settingsLabel}>Repeat password</label>
                </div>
                <div className={classes.inputBox}>
                    <input name='settingsPassword2' type="password" className={classes.profileInput} required value={settingsForm.bio} onChange={(e) => setSettings({...settingsForm, bio: e.target.value})}/>
                    <label htmlFor="settingsPassword2" className={classes.settingsLabel}>Bio</label>
                    <div className={classes.bio}>
                        <p className={classes.bioLabel}>Any details such as age, occupation or city.</p>
                        <p className={classes.bioLabel}>Example: 23 y.o. designer from San Francisco</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;