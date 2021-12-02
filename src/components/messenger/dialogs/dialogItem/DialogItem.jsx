import React, {useEffect} from 'react'
import classes from './dialog-item.module.css'
import unnamed from './unnamed.jpg'

const DialogItem = ({id, index, name, lastTalk, onclick, current, unreadCount, online, otherMembers}) => {
    const sendID = () => {
        onclick(id)
    }
    const getAvatar = (id) => {
        return '/get_file?file_id=' + id
    }

    return (
        <div className={current ? classes.dialogItem + ' ' + classes.currentItem : classes.dialogItem} onClick={sendID}>
            <div className={classes.left}>
                <div className={classes.avatar}><img src={otherMembers?.length === 1? (otherMembers[0].avatar_id ? getAvatar(otherMembers[0].avatar_id) : unnamed) : unnamed} alt=''/></div>
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