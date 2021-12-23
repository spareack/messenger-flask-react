import React, {useState, useEffect} from 'react'
import classes from './notifications.module.css'
import CheckBox from '../CheckBox'
import {useDispatch, useSelector} from 'react-redux'
import { setSound } from '../../../../store/UIReducer'

const NotificationSettings = () => {
    const [sound, setSound] = useState(false)
    const dispatch = useDispatch()
    const soundSetting = useSelector(state => state.UI.sound)

    useEffect(() => {
        console.log(sound)
        dispatch({type: 'setSound', sound})
    }, [sound, dispatch])

    return (
        <div className={classes.notification}>
            <CheckBox value={sound} setValue={setSound}>
                <p>Выключить звук</p>
            </CheckBox>
        </div>
    )
}

export default NotificationSettings
