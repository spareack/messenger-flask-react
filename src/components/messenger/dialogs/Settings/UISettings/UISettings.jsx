import React, {useState} from 'react'
import classes from './UISettings.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { fontSize } from '../../../../store/UIReducer'

const UISettings = () => {
    const dispatch = useDispatch()
    const font = useSelector(state => state.UI.fontSize)
    

    return (
        <div className={classes.uisettings}>
            <div className={classes.fontChanger}>
                <p>Font size</p>
                <input className={classes.fontSizer} 
                    type='range' 
                    max={20} 
                    min={12} 
                    step={1} 
                    value={font} 
                    onChange={(e) => {dispatch({type: 'setFontSize', payload: e.target.value})}}/>
                    <span>{font}</span>
            </div>
        </div>
    )
}

export default UISettings
