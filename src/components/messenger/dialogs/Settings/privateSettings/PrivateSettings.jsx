import React, {useState} from 'react'
import classes from './private.module.css'
import CheckBox from '../CheckBox'

const PrivateSettings = () => {
    const [email, setEmail] = useState(false)
    const [bio, setBio] = useState(false)
    const [age, setAge] = useState(false)

    return (
        <div className={classes.private}>
            <CheckBox value={email} setValue={setEmail}>
                <p>Скрывать почту</p>
            </CheckBox>
            <CheckBox value={bio} setValue={setBio}>
                <p>Скрывать информацию</p>
            </CheckBox>
            <CheckBox value={age} setValue={setAge}>
                <p>Скрывать возраст</p>
            </CheckBox>
        </div>
    )
}

export default PrivateSettings
