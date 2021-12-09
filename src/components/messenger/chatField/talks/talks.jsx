import React from 'react'
import classes from './talks.module.css'
import TalkItem from './talksItem' 
import {useDispatch, useSelector} from 'react-redux'
import { Talk } from '../../../constructor'

const Talks = ({ current, setTalk, createTalk, currentDialog, active}) => {
    const dispatch = useDispatch()
    const talks = useSelector(state => state.talks.talks)
    const talkCreator = async () => {
        let res = await createTalk('New Talk!', currentDialog)
        dispatch({type: 'setTalks', payload: [...talks, new Talk(res.id, "New Talk!", '27.09.2021')]})
        dispatch({type: 'setCurrentTalk', payload: res.id})
        dispatch({type: 'setLastTalk', payload: res.id})
    }

    return (
        <div className={active ? classes.talks : classes.talks} style={active ? {width: '35%'} : {width: '0%', border: 'none'}}>
            <button onClick={talkCreator} className={classes.talksHead}>Search</button>
            <div className={classes.talksItems}>
            <div className={classes.noTalkItem}>Coming soon!</div>
                {talks ? talks.map((talk) => <TalkItem   
                                                key={talk.id}
                                                id={talk.id}
                                                name={talk.title}
                                                item={talk}
                                                current={current === talk.id}
                                                onclick={setTalk} />) 
            : <div className={classes.noTalkItem}>Ещё не заведено ни одного разговора</div>}
            </div>
        </div>
    )
}

export default Talks
