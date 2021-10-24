import React from 'react'
import classes from './styles/talkItem.module.css'

const TalkItem = ({id, name, item}) => {
    return (
        <div className={classes.talkItem}>
            {name}
        </div>
    )
}

export default TalkItem
