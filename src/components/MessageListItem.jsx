import React from 'react'
import classes from './styles/MessageListItem.module.css'

const MessageListItem = ({from, text, name, time}) => {
    return (
        <div className={from ? classes.right + ' ' + classes.msgListItem: classes.left  + ' ' + classes.msgListItem} >
            {/*<h3>{name}</h3>*/}
            <p className={classes.text}>{text}</p>
            <span className={classes.time}>{time}</span>
        </div>
    )
}

export default MessageListItem
