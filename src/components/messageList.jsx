import React, {useState, useEffect} from 'react'
import MessageListItem from './MessageListItem'
import classes from './styles/MessageList.module.css'

const MessageList = ({messages, user}) => {
    return (
        <div className={classes.MessageList}>
            {messages ?
            messages.map((msgItem, index) => 
                <MessageListItem from={user.id === msgItem.sender} text={msgItem.value} time={msgItem.date} key={index}/>
            )
            :<MessageListItem from={true} text={'Напишите этому человеку!'} time={'А это не важно'}/>}
        </div>
    )
}

export default MessageList
