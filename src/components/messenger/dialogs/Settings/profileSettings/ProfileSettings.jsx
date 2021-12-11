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
    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState(null)

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

    const customAvatar = () => {
        const form = new FormData()
        form.append('file', photo)
        axios.post('/upload_avatar', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {if(res.data.status === 0){
            console.log(photo)
            window.location.reload()
        }})
        .catch(error => console.log(error))
    }

    const getAvatar = (id) => {
        return id ? '/get_file?file_id=' + id : unnamed
    }

    const onSelectFile = (e) => {
        setPhoto(e.target.files[0])
        const previewURL = URL.createObjectURL(e.target.files[0])
        setPreview(previewURL)
    }

    return (
        <div className={classes.ProfileSettings}>
            <div className={classes.avatarChanger}>
                <img height={45} width={45} src={preview? preview : getAvatar(user.photoURL)}/>
                <input type="file" id="inputFile" onChange={onSelectFile}/>
                <label className={classes.inputFile} htmlFor="inputFile"> Select a file </label>
                <button className={classes.userPhoto} onClick={customAvatar}>Change avatar!</button>
            </div>
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