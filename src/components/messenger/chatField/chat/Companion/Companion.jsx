import React from 'react'
import classes from './companion.module.css'
import unnamed from './unnamed.jpg'
import threeDots from './companionSettings.svg'
import { useSelector, useDispatch } from 'react-redux'

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
                if(companion?.other_members[0].date_visit) return 'last visit on ' + companion.other_members[0].date_visit
                else return 'last seen recently'
            }
        } else return ''
    }

    const toggleCompanionMenu = (e) => {
        e.stopPropagation()
        active ? dispatch({type: 'setCompanionDisabled'}) : dispatch({type: 'setCompanionActive'})
    }

    const rightMenuHandler = () => {
        setActive(active => !active)
        setTimeout(() => dispatch({type: 'setTalksActive'}),300)
    }

    const blockPerson = () => {
        console.log('coming soon!')
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
        <div className={classes.companion} style={companion?.other_members.length ? {display: 'flex'} : {display: 'none'} }>
            <div className={classes.companionInfo} onClick={checkProfile}>
            <div className={classes.avatar}><img alt='' src={companion?.other_members.length === 1? getAvatar(companion.other_members[0].avatar_id) : unnamed}/></div>
                <div><h2 style={{marginLeft: companion?.other_members?.length ? '' : '15px'}}>{companion?.other_members?.length? companion?.other_members.length === 1? companion?.other_members[0].name :'Название группового разговора': 'Выберите диалог'}</h2>
                <p>{onlineStatus()}</p></div>
            </div>
            <div className={classes.companionButtons}>
                {/* <button style={{paddingBottom: '3px'}} className={classes.talkButton} onClick={toggleCompanionMenu}><img height={30} src={threeDots}/></button>
                <div style={{display: active ? 'flex': 'none'}} className={classes.dropDownMenu} onClick={e => e.stopPropagation()}>
                    <button className={classes.companionButtonsItem} onClick={checkProfile}>Profile</button>
                    <button className={classes.companionButtonsItem} onClick={blockPerson}>Block</button>
                </div> */}
                <button className={classes.talkButton} onClick={rightMenuHandler}>Talks →</button>
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
