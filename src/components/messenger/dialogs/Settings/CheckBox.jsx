import React from 'react'
import classes from './checkbox.module.css'

const CheckBox = ({value, setValue, children}) => {
    return (
        <div className={classes.settingContainer}>
            <div className={classes.checkBoxContainer}>
                <div className={classes.slider}>
                    <input  id='emailCheck' type={'checkbox'} 
                            value={value} 
                            onChange={(e) => (setValue(e.target.checked))}/> 
                    <label htmlFor='emailCheck'></label>
                </div>
            </div>
            {children}
        </div>
    )
}

export default CheckBox
