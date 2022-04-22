import React from 'react'
import TalkItem from './talksItem' 
import {useDispatch, useSelector} from 'react-redux'

import { Talk } from '../../../constructor'
import { createTalk } from '../../../../chatAPI'

import classes from './talks.module.css'
import unnamed from './unnamed.jpg'
import arrowBack from './arrowBack.svg'

const Talks = ({active, setActive}) => {
    const dispatch = useDispatch()

    const talks = useSelector(state => state.talks.talks)
    const current = useSelector(state => state.talks.currentTalk)
    const talksIsActive = useSelector(state=> state.companion.talksIsActive)
    const currentDialog = useSelector(state=>state.user.currentDialog)
    const companion = useSelector(state => state.user.dialogs.find(dialog => dialog.id === state.user.currentDialog)?.other_members[0])
    
    const talkCreator = async () => {
        let res = await createTalk('New Talk!', currentDialog)
        dispatch({type: 'setTalks', payload: [...talks, new Talk(res.id, "New Talk!", res.date)]})
        dispatch({type: 'setCurrentTalk', payload: res.id})
        dispatch({type: 'setLastTalk', payload: res.id})
    }

    const rightMenuHandler = () => {
        setActive(false)
        setTimeout(() => dispatch({type: 'setTalksActive'}), 300)
    }
    
    if(talksIsActive) return (
        <div className={classes.talks} style={active ? {width: '35%'} : {width: '0%', border: 'none'}}>
            <button className={classes.talksHead}>Search</button> {/*onClick={talkCreator}*/}
            <div className={classes.talksItems}>
            <div className={classes.noTalkItem}>Coming soon!</div>
                {talks 
                ? talks.map((talk) => <TalkItem   
                                            key={talk.id}
                                            id={talk.id}
                                            name={talk.title}
                                            current={current === talk.id}
                                            />) 
                : <div className={classes.noTalkItem}>Ещё не заведено ни одного разговора</div>}
            </div>
        </div>
    )
    else return (
        <div className={classes.talks} style={active ? {width: '35%'} : {width: '0%', border: 'none'}}>
            <button onClick={rightMenuHandler} className={classes.backButton}>
                <img  height={45} src={arrowBack}/> 
                Back to dialog
            </button>
            <div className={classes.companionInfo}>
                <img    style={{borderRadius: '75%', marginLeft: '10px'}} 
                        src={companion.avatar_id ? '/get_file?file_id=' + companion.avatar_id : unnamed} 
                        height={45} 
                        width={45} 
                        alt=''/>
                <div className={classes.companionInfoItem}>
                    <h2>Name</h2>
                    <p>{companion.name}</p>
                </div>
                <div className={classes.companionInfoItem}>
                    <h2>Email</h2>
                    <p>{companion?.email ? companion.email : 'Пользователь ограничил доступ к своей почте'}</p>
                </div>
                <div className={classes.companionInfoItem}>
                    <h2>Age</h2>
                    <p>{companion?.age ? companion.age: 'Пользователь ограничил доступ к своему возрасту'}</p>
                </div>
                <div className={classes.companionInfoItem}>
                    <h2>Bio</h2>
                    <p>{companion?.bio ? companion.bio : 'Пользователь ограничил доступ к информации о себе'}</p>
                </div>
            </div>
        </div>
    )
}

export default Talks