import React from 'react'
import classes from './talkItem.module.css'
import {useDispatch} from 'react-redux'

const TalkItem = ({id, name, item, current, onclick}) => {

    const dispatch = useDispatch()

    const sendTalkID = () => {
        onclick(item.id)
        dispatch({type: 'setCurrentTalk', payload: item.id})
    }

    return (
        <div className={current ? classes.talkItem + ' ' + classes.currentTalkItem : classes.talkItem} /*onClick={sendTalkID}*/>
            {name}
        </div>
    )
}

export default TalkItem
