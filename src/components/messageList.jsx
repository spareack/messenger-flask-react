import React from 'react'
import MessageListItem from './MessageListItem'
import classes from './styles/MessageList.module.css'

const MessageList = (props) => {

    /* Dev test items */
    const owner = true
    const time = '16:10'
    const text = 'здарова димас'
    const text2 = 'пошёл в жопу ваня привет'
    const text3 = 'я заебался кароче это делать пошло оно всё в задницу'
    const longtext = 'qqqqqqqqq qqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
    /* Dev test items */

    return (
        <div className={classes.MessageList}>
            <MessageListItem from={owner} text={text} time={time}/>
            <MessageListItem from={!owner} text={text2} time={time}/>
            <MessageListItem from={owner} text={longtext} time={time}/>
            <MessageListItem from={!owner} text={longtext} time={time}/>
        </div>
    )
}

export default MessageList
