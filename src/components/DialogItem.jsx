import React from 'react'
import classes from './styles/dialog-item.module.css'
import unnamed from '../unnamed.jpg'

const DialogItem = ({id, index, name, lastTalk, onclick, current}) => {
    const sendID = () => {
        onclick(id)
    }

    return (
        <div className={current ? classes.dialogItem + ' ' + classes.currentItem : classes.dialogItem} onClick={sendID}>
            <div className={classes.avatar}><img src={unnamed} alt='???'/></div>
            <div className={classes.dialogItemText}>
                <h3>{name}</h3>
                <p>{lastTalk}</p>
            </div>
        </div>
    )
}

export default DialogItem;