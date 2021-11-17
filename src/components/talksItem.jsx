import React from 'react'
import classes from './styles/talkItem.module.css'

const TalkItem = ({id, name, item, current, onclick}) => {

    const sendTalkID = () => {
        onclick(item.id)
    }

    return (
        <div className={current ? classes.talkItem + ' ' + classes.currentTalkItem : classes.talkItem} onClick={sendTalkID}>
            {name}
        </div>
    )
}

export default TalkItem
