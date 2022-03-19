import React, {useState, useEffect} from 'react'
import classes from './private.module.css'
import CheckBox from '../CheckBox'

const PrivateSettings = () => {
    const [email, setEmail] = useState(false)
    const [bio, setBio] = useState(false)
    const [age, setAge] = useState(false)

    useEffect(()=>{
        console.log(email, 'email clicked!')
    }, [email])

    useEffect(()=>{
        console.log(bio, 'bio clicked!')
    }, [bio])

    useEffect(()=>{
        console.log(age, 'age clicked!')
    }, [age])

    return (
        <div className={classes.private}>
            <CheckBox value={email} setValue={setEmail}>
                Скрывать почту
            </CheckBox>
            <CheckBox value={bio} setValue={setBio}>
                Скрывать информацию
            </CheckBox>
            <CheckBox value={age} setValue={setAge}>
                Скрывать возраст
            </CheckBox>
        </div>
    )
}

export default PrivateSettings
