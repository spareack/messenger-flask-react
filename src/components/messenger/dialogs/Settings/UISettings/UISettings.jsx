import React, {useState} from 'react'
import classes from './UISettings.module.css'

const UISettings = () => {
    const [font, setFont] = useState(16)

    return (
        <div className={classes.uisettings}>
            <input type='number' readOnly value={font}/><input className={classes.fontSizer} type='range' max={24} min={10} step={2} value={font} onChange={(e) => {setFont(e.target.value)}}/>
        </div>
    )
}

export default UISettings
