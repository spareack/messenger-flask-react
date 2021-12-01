import React from 'react'
import classes from './companion.module.css'
import unnamed from './unnamed.jpg'

const Companion = ({companion, setActive}) => {

    return (
        <div className={classes.companion} style={companion?.other_members.length ? {display: 'flex'} : {display: 'none'} }>
            <div className={classes.companionInfo}>
                {companion?.other_members?.length && (companion?.photoURL === undefined
                ? <div className={classes.avatar}><img alt='' src={unnamed}/></div>
                : <div className={classes.avatar}><img alt='' src={companion.photoURL}/></div>)
                }
                <div><h2 style={{marginLeft: companion?.other_members?.length ? '' : '15px'}}>{companion?.other_members?.length? companion?.other_members.length === 1? companion?.other_members[0].name :'Название группового разговора': 'Выберите диалог'}</h2>
                <p>{companion?.other_members.length === 1 ? (companion?.other_members[0].user_status ? 'online' : 'last seen recently') : ''}</p></div>
            </div>
            <button className={classes.talkButton} onClick={() => {setActive(active => !active)}}>Talks →</button>
        </div>
            
    )
}

export default Companion
