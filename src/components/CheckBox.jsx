import React from 'react'
import classes from '../styles/checkbox.module.css'

const CheckBox = ({value, setValue, children}) => {

    const checkBoxHandler = (e) => {
        setValue(e.target.checked)
    }
    return (
        <div className={classes.settingContainer}>
            <div className={classes.checkBoxContainer}>
                <div className={classes.slider}>
                    <input id={'check' + children} type={'checkbox'} 
                            value={value} 
                            onChange={checkBoxHandler}/> 
                    <label htmlFor={'check' + children}></label>
                </div>
            </div>
            <p>{children}</p>
        </div>
    )
}

export default CheckBox
