import React, {useEffect} from 'react'
import classes from './companion.module.css'
import unnamed from './unnamed.jpg'
import { useSelector } from 'react-redux'

const Companion = ({companion, setActive}) => {
    const online = useSelector(state => state.user.dialogs.find((dialog) => (dialog.id === state.user.currentDialog))?.other_members[0].user_status)
    useEffect(()=> {
        console.log("user status = "+online)
    })
    const getAvatar = (id) => {
        return id ? '/get_file?file_id=' + id : unnamed
    }
// companion?.other_members[0].user_status
    return (
        <div className={classes.companion} style={companion?.other_members.length ? {display: 'flex'} : {display: 'none'} }>
            <div className={classes.companionInfo}>
            <div className={classes.avatar}><img alt='' src={companion?.other_members.length === 1? getAvatar(companion.other_members[0].avatar_id) : unnamed}/></div>
                <div><h2 style={{marginLeft: companion?.other_members?.length ? '' : '15px'}}>{companion?.other_members?.length? companion?.other_members.length === 1? companion?.other_members[0].name :'Название группового разговора': 'Выберите диалог'}</h2>
                <p>{companion?.other_members.length === 1 ? ( online ? 'online' : 'last seen recently') : ''}</p></div>
            </div>
            <button className={classes.talkButton} onClick={() => {setActive(active => !active)}}>Talks →</button>
        </div>
            
    )
}

export default Companion
