import React, {useState} from 'react'
import classes from './styles/companion.module.css'
import unnamed from './unnamed.jpg'

const Companion = ({companion, setActive}) => {

    return (
        <div className={classes.companion}>
            <div className={classes.companionInfo}>
                {companion?.photoURL === undefined
                ? <div className={classes.avatar}><img alt='' src={unnamed}/></div>
                : <div className={classes.avatar}><img alt='' src={companion.photoURL}/></div>
                }
                <div><h2>{companion?.other_members?.length === 1? companion?.other_members: 'Название группового разговора'}</h2>
                <p>last seen recently</p></div>
            </div>
            <button className={classes.talkButton} onClick={() => {setActive(active => {console.log(active); return !active})}}>→</button>
        </div>
            
    )
}

export default Companion
