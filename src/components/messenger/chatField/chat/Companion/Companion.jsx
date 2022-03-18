import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import classes from './companion.module.css'
import mobile from './mobileCompanion.module.css'
import unnamed from './unnamed.jpg'
import settings from './companionSettings.svg'

const Companion = ({companion, setActive}) => {
    const online = useSelector(state => state.user.dialogs.find((dialog) => (dialog.id === state.user.currentDialog))?.other_members[0].user_status)
    const active = useSelector(state => state.companion.active)
    const talksIsActive = useSelector(state => state.companion.talksIsActive)
    const getAvatar = (id) => {
        return id ? '/get_file?file_id=' + id + '&purpose=avatar' : unnamed
    }
    const dispatch = useDispatch()


    const onlineStatus = () => {
        if(companion?.other_members.length === 1) {
            if(online){
                return 'online'
                // if(document.visibilityState === 'hidden') return 'inactive'
                // else return 'online'
            } else {
                return companion?.other_members[0].date_visit
            }
        } else return ''
    }

    const rightMenuHandler = () => {
        setActive(active => !active)
        setTimeout(() => dispatch({type: 'setTalksActive'}),300)
    }

    const checkProfile = () => {
        if(talksIsActive){
            dispatch({type: 'setTalksDisabled'})
            setActive(true)
        } else {
            setTimeout(() => dispatch({type: 'setTalksActive'}), 300)
            setActive(false)
        }
    }
    return (
        <div className={isMobile ? classes.companion + ' ' + mobile.companionM : classes.companion} style={companion?.other_members.length ? {display: 'flex'} : {display: 'none'} }>
            <div className={classes.companionInfo} onClick={checkProfile}>
            <div className={classes.avatar}>
                <img alt='' src={companion?.other_members.length === 1? getAvatar(companion.other_members[0].avatar_id) : unnamed}/>
            </div>
                <div>
                    <h2 style={{marginLeft: companion?.other_members?.length ? '' : '15px'}}>
                        {companion?.other_members?.length? companion?.other_members.length === 1? companion?.other_members[0].name :'Название группового разговора': 'Выберите диалог'}
                    </h2>
                    <p>
                        {onlineStatus()}
                    </p>
                </div>
            </div>
            <div className={classes.companionButtons}>
                {isMobile
                ? <button className={classes.talkButton} onClick={checkProfile}><img src={settings} alt='settings button' height={30}/></button>
                : <button className={classes.talkButton} onClick={rightMenuHandler}>Talks →</button>}
            </div>       
        </div>
            
    )
}

// {
//     id: int,
//     last_message: str,
//     other_members: [{
//         avatar_id: int or null,
//         name: str,
//         user_status: bool,
//         date_visit: date
//     }]
// }

export default Companion
