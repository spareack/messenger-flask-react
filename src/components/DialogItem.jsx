import React, {useEffect} from 'react'
import { isMobile } from 'react-device-detect'
import {useSelector} from 'react-redux'

import classes from '../styles/dialogItem.module.css'
import mobile from '../styles/mobileDialogItem.module.css'
import unnamed from '../assets/unnamed.jpg'

const DialogItem = ({id, index, name, lastTalk, changeDialog, current, unreadCount, online, otherMembers}) => {

    const currentDialog = useSelector(state => state.user.currentDialog)

    const sendID = () => {
        changeDialog(id)
    }

    const getAvatar = () => {
        if(otherMembers?.length === 1){
            if(otherMembers[0].avatar_id) return '/get_file?file_id=' + otherMembers[0].avatar_id + '&purpose=avatar'
            else return unnamed
        } else return unnamed
        
    }

    const mainClassesHandler = (current, isMobile) => {
        let result = classes.dialogItem
        if (current) {
            result += ' ' + classes.currentItem 
        }
        if (isMobile) {
            result += ' ' + mobile.dialogItemM
        }
        return result
    }

    return (
        <div className={mainClassesHandler(current, isMobile)} onClick={sendID}>
            <div className={classes.left}>
                <div className={classes.avatar}>
                    <img src={getAvatar()} alt=''/>
                    <span style={{display: online ? 'flex' : 'none'}} className={classes.isOnline}>•</span>
                </div>
                <div className={classes.dialogItemText}>
                    <div className={classes.nameContainer}>
                        <h3>{name}</h3>
                    </div>
                    <div className={classes.lastMessageContainer}>
                        <p className={classes.lastMessage}>{lastTalk}</p>
                    </div>
                </div>
            </div>
            <div className={classes.dot} style={{opacity: unreadCount && (currentDialog !== id) ? '1' : '0'}}>
                {unreadCount}
            </div>
        </div>
    )
}

export default DialogItem;