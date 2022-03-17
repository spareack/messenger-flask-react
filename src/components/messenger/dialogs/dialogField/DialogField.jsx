import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

import DialogItem from '../dialogItem/DialogItem'
import Search from '../Search/Search'
import Settings from '../Settings/Settings'

import { useDispatch, useSelector } from 'react-redux';
import { setTalks, setCurrentTalk, setLastTalk } from '../../../store/talksReducer';
import axios from 'axios'

import { Separator, Dialog, Member } from '../../../constructor'
import { getMessages, createTalk, getTalks } from '../../../../chatAPI'

import classes from './dialogsField.module.css'
import mobile from './mobile.module.css'
import settingsIMG from './settings.svg'
import unnamed from './unnamed.jpg'

// функция сортировки массива объектов по полю, с числовым значением
function byField(field) {
    return (a, b) => +a[field] > +b[field] ? -1 : 1;
}

const CHATS = 'chats'
const SETTINGS = 'settings'
const LOGOUT = 'Log out'

const DialogsField = ({ setLoggedOut }) => {
    
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const currentDialog = useSelector(state => state.user.currentDialog)
    const dialogs = useSelector(state => state.user.dialogs)
    const searchInput = useSelector(state => state.search.value)
    const names = useSelector(state => state.search.names)

    const [settings, setSettingsWindow] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(CHATS)
    /* UI */
    useEffect( () => {
        if(!isMobile) {
            const container = document.getElementById('leftColumn')
            const rightColumg = document.getElementById('rightColumn')
            const handler = document.getElementById("resizer")
            handler.addEventListener('dblclick', (e) => {
                rightColumg.style.width = 100 + '%'
                container.style.width = 30 + '%'
            })
            handler.addEventListener('mousedown', rightMouseDown)
            function rightMouseDown(e) {
            e.preventDefault()
            document.onmousemove = rightElementDrag;
            document.onmouseup = closeDragElement;
            }
            function rightElementDrag(e) {
            e = e || window.event
            e.preventDefault()
            
            const width = e.clientX;
            rightColumg.style.width = `calc(100% - ${width}px)`
            container.style.width = width + 'px'
            }
            
            function closeDragElement() {
            document.onmouseup = null
            document.onmousemove = null
            }
        }
      }, []) 

    /*самая сложная функция этого проекта
    изменяется currentDialog на новый кликнутый, получаются разговоры оттуда, потом по тем разговорам получаются
    получаются сообщения, и если их меньше, чем нужно для появления полосы прокрутки, то подгружаются следующие 
    до тех пор, пока они не закончатся или пока полоса не появится
    примерно их 20 штук, но мониторы разные, поэтому стоит сделать 40
    в случае отсутствия разговоров создаётся разговор 'First Talk'*/

    const changeDialog = async (id) => {
        dispatch({type:'setCurrentDialog', payload: id})
        let res = await getTalks(id)
        if(res.talks?.length) {
            const lastTalkIndex = res.talks.length-1
            const sortedTalks = res.talks.sort(byField("id")).reverse()

            dispatch(setTalks(sortedTalks))
            dispatch(setCurrentTalk(sortedTalks[lastTalkIndex].id))
            dispatch(setLastTalk(sortedTalks[lastTalkIndex].id))

            let messages = await getMessages(sortedTalks[lastTalkIndex].id)
            dispatch({type: 'setMessages', payload: messages})

            let totalMessages = [...messages]
            let loadedTalkId = lastTalkIndex
            
            while(totalMessages.length < 20) {
                loadedTalkId = loadedTalkId - 1
                let nextMessages = await getMessages(sortedTalks[loadedTalkId]?.id)
                if(nextMessages) {
                    let separator = new Separator(sortedTalks[loadedTalkId+1].title)
                    totalMessages = [...totalMessages, separator, ...nextMessages]
                    dispatch({type: 'setMessages', payload: totalMessages})
                } else break
            }
        } else {
            let newTalk = await createTalk('First talk!', id)
            dispatch(setCurrentTalk(newTalk.id))
            dispatch(setLastTalk(newTalk.id))
        }  
    }

    const getAvatar = (id) => {
        return id ? '/get_file?file_id=' + id : unnamed
    }

    const changeWindow = (e) => {
        setMobileMenu(e.target.value)
        if(e.target.value == LOGOUT){
            axios.get('/un_authorize')
            setLoggedOut(false)
            document.location.reload()
        }
    }

    const addUser = (id) => {
        let name = names.find(item => item.id == id).name
        console.log(name, id)
        axios({
            method: 'post',
            url: "/create_dialog",
            data: {
                title: name,
                members: [user.id, id]
            }
        })
        .then(res => {
            console.log(name, res.data)
            if(res.data.status === 0)dispatch({ type: 'setUserDialogs', payload: [...dialogs, new Dialog(res.data.id, null, [new Member(null, name, 0)])] })
            else if(res.data.status === 1) alert('диалог занят')
            else if(res.data.status === 666) alert('Ошибка')
        })
        .catch(error => console.log(error))
    }
    
    if(isMobile) return (
        <div className={mobile.Dialogs}>
            <div className={mobile.navbar}>
                <select onChange={e => changeWindow(e)}>
                    <option value={CHATS}>Chats</option>
                    <option value={SETTINGS}>Settins</option>
                    <option value={LOGOUT}>Log Out</option>
                </select>
            </div>
            
            <Search settings={settings}/>
            <div className={mobile.DialogList}>
                {searchInput == '' 
                ? dialogs.map((post, index)=> (
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
                ))
                : names.map((post, index)=> (
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
                ))
                }
            </div>
        </div>
    )
    else return (
        <div className={classes.Dialogs} id="leftColumn">
            <div className={classes.handlerRight} id="resizer"></div>

            <div style={{height: settings ? '10%' : '20%'}} className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}>
                    <div onClick={(e) => {e.stopPropagation()}}>
                        <button className={classes.dropDownMenuButton} onClick={() => setSettingsWindow((settings => !settings))}>
                            <img src={settingsIMG} alt=''/>
                        </button>
                    </div>
                    <div className={classes.userInfo} onClick={() => (dispatch({type: 'DISABLE_MENU'}))}>
                        <img src={getAvatar(user.photoURL)} alt='' className={classes.userAvatar}/>
                        <h2>{user.name}</h2>
                    </div>
                </div>
                <Search settings={settings}/>
            </div>

            <div className={classes.DialogList} style={{height: settings ? '90%' : '80%'}}>
                {!settings ? 
                dialogs.map((post, index)=> (
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
                ))
                : <Settings setSettingsWindow={setSettingsWindow} setLoggedOut={setLoggedOut} active={settings}/>
                }
            </div>
        </div>
    )
}

export default DialogsField;
