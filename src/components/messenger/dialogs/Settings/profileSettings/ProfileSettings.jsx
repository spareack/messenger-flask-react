import React, {useState} from 'react'
import classes from './profileSetting.module.css'
import unnamed from './unnamed.jpg'
import axios from 'axios'
import {useSelector} from 'react-redux'

const ProfileSettings = () => {
    const user = useSelector(state => state.user)
    const [validName, setValidName] = useState(true)
    const [settingsForm, setSettings] = useState({
        name: user.name,
        password1: '',
        password2: '',
        bio: user.bio
    })
    const [photo, setPhoto] = useState('')

    const checkName = (e) => {
        setSettings({...settingsForm, name: e.target.value})
        if(e.target.value !== user.name)axios({
            method: 'get',
            url: '/check_name',
            params: {
                userName: e.target.value
            },
            headers: {
                'Content-Type': 'application/json'
                // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
            }
        }).then(res => {
            setValidName(res.data.status)
        }).catch(error => alert(error))
    }


    return (
        <div className={classes.ProfileSettings}>
            <input type="file" className={classes.userPhoto} src={user.photoURL ? user.photoURL : unnamed} alt='' onChange={(e) => {console.log(e.target.files[0]); setPhoto(e.target.files[0])}}/>
            {/* <button className={classes.userPhoto}><img src={user.photoURL ? user.photoURL : unnamed} alt=''/></button> */}
            <div className={classes.ProfileSettingsField}>
                <div className={classes.inputBox}>
                    <input name='settingsName' type="text" className={classes.profileInput} style={ validName && user.name !== settingsForm.name ? {color: "red"} : {color: '#FFFFF1'}} required value={settingsForm.name} onChange={checkName}/>
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