import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DialogItem from './DialogItem'
import WorkSpace from './workSpace'
import Settings from './Settings'

import {CHATS, SETTINGS, LOGOUT, MESSENGER} from './DialogField'

import mobile from '../styles/mobileMessenger.module.css'

const MMessenger = ({currentWindow=CHATS, changeDialog, addUser, setMobileMenu}) => {

    const user = useSelector(state => state.user)
    const currentDialog = useSelector(state => state.user.currentDialog)
    const dialogs = useSelector(state => state.user.dialogs)
    const searchInput = useSelector(state => state.search.value)
    const names = useSelector(state => state.search.names)

    switch(currentWindow){
        case CHATS:
            if(searchInput === '') return (
                <div>
                {dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post?.id} 
                        id={post?.id}
                        index={index}
                        name={post?.other_members?.length === 1 ? post?.other_members[0].name : 'Групповой диалог'}
                        lastTalk={post?.last_message ? post?.last_message : 'There is no messages'}
                        changeDialog={changeDialog}
                        current={currentDialog === post.id}
                        unreadCount = {post.unread_count}
                        online={post?.other_members.length === 1 ? post?.other_members[0].user_status : undefined}
                        otherMembers={post?.other_members}/>
                ))}
                </div>
            )
            else return (
                <div className={mobile.MMessenger}>{
                    names.map((post, index)=> (
                        <DialogItem 
                            key={post?.id} 
                            id={post?.id}
                            index={index}
                            name={post.name}
                            lastTalk={'There is no messages'}
                            changeDialog={addUser}
                            current={false}
                            unreadCount = {0}
                            online={post.user_status}
                            otherMembers={post?.other_members}/>
                    ))}</div>
            )
        case SETTINGS: 
            return (
                <div className={mobile.MMessenger}>
                    <Settings />
                </div>
            )
        case MESSENGER:
            return (
                <div className={mobile.MMessenger}>
                    <WorkSpace companion={dialogs.find(Dialog => (Dialog.id === currentDialog))} setMobileMenu={setMobileMenu}/>
                </div>
            )
        default:
            return <div>Messenger Error!</div>
    }
}

export default MMessenger