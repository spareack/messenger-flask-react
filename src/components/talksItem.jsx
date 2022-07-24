import React from 'react'
import classes from '../styles/talkItem.module.css'

const TalkItem = ({id, name, current}) => {
    return (
        <div className={current ? classes.talkItem + ' ' + classes.currentTalkItem : classes.talkItem}>
            {name}
        </div>
    )
}

export default TalkItem
