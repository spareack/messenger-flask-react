import React, {useEffect} from 'react'
import classes from './dialog-item.module.css'
import unnamed from './unnamed.jpg'

const DialogItem = ({id, index, name, lastTalk, onclick, current, unreadCount}) => {
    const sendID = () => {
        onclick(id)
    }
    

    return (
        <div className={current ? classes.dialogItem + ' ' + classes.currentItem : classes.dialogItem} onClick={sendID}>
            <div className={classes.left}>
                <div className={classes.avatar}><img src={unnamed} alt='???'/></div>
                <div className={classes.dialogItemText}>
                    <h3>{name}</h3>
                    <p>{lastTalk}</p>
                </div>
            </div>
            <div className={classes.dot} style={{opacity: unreadCount ? '1' : '0'}}>
                {unreadCount}
            </div>
        </div>
    )
}

export default DialogItem;