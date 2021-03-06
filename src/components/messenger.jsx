import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import DialogsField from './DialogField'
import WorkSpace from './workSpace'
import Navbar from './Navbar'

import { socket } from '../libs/socket'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearchInput } from '../actions/searchActions'
import useSound from 'use-sound'

import { afkManager } from '../libs/afkManager'
import { Talk, Message, Dialog, Member, Separator, isYesterday, isCurrentDay } from '../libs/constructor'

import '../styles/App.css'
import meow from '../assets/meow.mp3'

function Messenger({ setLoggedOut }) {
    const [activeNavbar, setActiveNav] = useState(true)

    const dispatch = useDispatch() //диспетчер
    const [meowSound] = useSound(meow, {volume: 0.03}) //звук мяу
    
    //нужные данные из хранилища
    const user = useSelector(state => state.user)
    const messages = useSelector(state => state.messages.messages)
    const dialogs = useSelector(state => state.user.dialogs)
    const talks  = useSelector(state => state.talks.talks)
    const lastTalk = useSelector(state => state.talks.lastTalk)
    const currentDialog = useSelector(state => state.user.currentDialog)
    const sound = useSelector(state => state.UI.sound)
    
    /* Убираем меню поиска, меню собеседника и меню прикрепления медиа файлов по клику по другой области */
    const blurInput = () => {
        dispatch(changeSearchInput(''))
        dispatch({ type: 'DISABLE_NAMES' })
        dispatch({ type: 'DISABLE_MENU' })
        dispatch({ type: 'setCompanionDisabled' })
        dispatch({ type: "setAttachDisabled"})
    }
  
  
    const [res, setResponse] = useState(null)
    const [userStatus, setUserStatus] = useState(null)
    const [newDialog, setNewDialog] = useState(null)
    const [newTalk, setNewTalk] = useState(null)

  /* прослушивание событий с бекенда */
    useEffect(() => {
        socket.on("socket_info", res => {
            setResponse(res) 
        })
        socket.on('socket_status', res => {
            setUserStatus(res)
        })
        socket.on("new_dialog", res => {
            setNewDialog(res)
        })
        socket.on("new_talk", res => {
            setNewTalk(res)
        })
    }, []) 

    /* Добавление диалога в режиме real time */
    useEffect(() => {
        if (newDialog !== null) {
            const _dialogs = [...dialogs, new Dialog(newDialog.dialog_id, 'There is no messages', [new Member(newDialog.other_members[0].avatar_id, newDialog.other_members[0].name, newDialog.other_members[0].user_status)])]
            dispatch({type: 'setUserDialogs', payload: _dialogs})
        }
    }, [newDialog, dispatch] )

    /* Обработка добавления нового разговора у другого человека */
    useEffect(() => {
        if (newTalk !== null) {
            if (currentDialog === newTalk.dialog_id) {
                const _talks = [...talks, new Talk(newTalk.talk_id, newTalk.title, newTalk.date)]
                dispatch({type: 'setTalks', payload: _talks})
                dispatch({type: 'setCurrentTalk', payload: newTalk.talk_id})
                dispatch({type: 'setLastTalk', payload: newTalk.talk_id})
                dispatch({type: 'setMessages', payload: [...messages, new Separator(newTalk.title)]})
            }
        }
    }, [newTalk, dispatch])

    /* Обновление статуса пользователя */
    useEffect(() => {
        if (userStatus !== null) {
            const _dialogs = dialogs.map((dialog) => {
                if (dialog.id === userStatus.dialog_id) {
                    return {...dialog, other_members: dialog.other_members.map(item => { return {...item, user_status: userStatus.user_status}}) } 
                } else {
                    return dialog
                }
            })
            dispatch({type: 'setUserDialogs', payload: _dialogs})
        }
    }, [userStatus, dispatch])

    /* Обработка ответа на socket_info, т.е. добавление нового сообщения в нужный диалог */
    useEffect(() => {
        if (res !== null) {
            const _dialog = dialogs.map(dialog => {
                if (dialog.id === res.dialog_id) {
                    return { ...dialog, unread_count: res.dialog_id !== currentDialog ? res.unread_count : 0, last_message: res.type === 'text' ? res.value : res.type}
                }
                else return dialog
            })
            dispatch({type: 'setUserDialogs', payload: _dialog})
            if (currentDialog === res.dialog_id) {
                if(isCurrentDay(talks.filter(item => item.id === lastTalk)[0].date))dispatch({type: 'setMessages', payload: [new Message(res.message_id, res.sender, res.value, res.date, res.type), ...messages] })
                else dispatch({type: 'setMessages', payload: [new Message(res.message_id, res.sender, res.value, res.date, res.type), new Separator(isYesterday(undefined, true)), ...messages] })
            }
            if ( (currentDialog !== res.dialog_id || document.visibilityState === 'hidden') && sound) meowSound()
            socket.emit('read_messages', {dialog_id :user.currentDialog})
        }
    }, [res, dispatch])


    if (isMobile) {
    return (
        <div className="App" onClick={() => blurInput()}>
            <DialogsField setLoggedOut={setLoggedOut}/>
            {/* <WorkSpace companion={dialogs.find(Dialog => (Dialog.id === currentDialog))}/> */}
            {/* <Navbar active={activeNavbar}/> */}
        </div>
    )} else {
        return (
            <div className="App" onClick={() => blurInput()}>
                <DialogsField setLoggedOut={setLoggedOut}/>
                <WorkSpace companion={dialogs.find(Dialog => Dialog.id === currentDialog)}/>
            </div>
    )}
}

export default Messenger