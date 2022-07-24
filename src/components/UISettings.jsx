import React, {useState} from 'react'
import classes from '../styles/UISettings.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { fontSize } from '../actions/UIActions'

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
            <div className={classes.container}>
                <p>Themes: </p>
                <select>
                    <option>default (dark)</option>
                    <option>light</option>
                    <option>purple</option>
                </select>
            </div>
            <h1>Custom theme</h1>
            <div className={classes.container}>
                <p>Message Box Container Color: </p>
                <select>
                    <option>default</option>
                    <option>black</option>
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                    <option>pink</option>
                    <option>purple</option>
                    <option>indigo</option>
                </select>
            </div>
            <div className={classes.container}>
                <p>Message Box Text Color: </p>
                <select>
                    <option>default</option>
                    <option>black</option>
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                    <option>pink</option>
                    <option>purple</option>
                    <option>indigo</option>
                </select>
            </div>
            <div className={classes.container}>
                <p>Message background: </p>
                <select>
                    <option>default</option>
                    <option>black</option>
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                    <option>pink</option>
                    <option>purple</option>
                    <option>indigo</option>
                </select>
            </div>
            <div className={classes.container}>
                <p>Dialogs Background</p>
                <select>
                    <option>default</option>
                    <option>black</option>
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                    <option>pink</option>
                    <option>purple</option>
                    <option>indigo</option>
                </select>
            </div>
            <div className={classes.container}>
                <p>Messenger Components Color</p>
                <select>
                    <option>default</option>
                    <option>black</option>
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                    <option>pink</option>
                    <option>purple</option>
                    <option>indigo</option>
                </select>
            </div>
        </div>
    )
}

export default UISettings
