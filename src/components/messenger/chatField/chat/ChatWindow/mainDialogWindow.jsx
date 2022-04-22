import React, {useState, useEffect, useRef} from 'react'
import { flushSync } from 'react-dom'
import {useSelector, useDispatch} from 'react-redux'
import { isMobile } from 'react-device-detect'

import MessageList from '../MessageList/messageList'
import Companion from '../Companion/Companion'

import axios from 'axios'

import {sendMessage, getMessages, createTalk} from '../../../../../chatAPI'
import { isCurrentDay, isYesterday, Separator, Talk } from '../../../../constructor'

import attach from './attach.svg'
import classes from './MainWindow.module.css'
 
const MainWindow = ({companion, active, setActiveTalkMenu}) => {
    const dispatch = useDispatch()

    const textareaRef = useRef(null)
    const [messageText, setMessageText] = useState('')

    const user = useSelector(state => state.user)
    const messages = useSelector(state => state.messages.messages)
    const currentDialog = useSelector(state=> state.user.currentDialog)
    const talks = useSelector(state => state.talks.talks)
    const lastTalk = useSelector(state => state.talks.lastTalk)
    const attachIsActive = useSelector(state => state.attachMenu.active)

    const sendMessageLocal = async (e) => {
        e.preventDefault()
        setMessageText('');
        if(messageText !== '')
        {
            if(isCurrentDay(talks.filter(item => item.id === lastTalk)[0].date))sendMessage(messageText, user.id, lastTalk, currentDialog)
            else {
                const res = await createTalk(isYesterday(undefined, true), currentDialog)
                dispatch({type: 'setTalks', payload: [...talks, new Talk(res.id, isYesterday(undefined, true), res.date)]})
                dispatch({type: 'setCurrentTalk', payload: res.id})
                dispatch({type: 'setLastTalk', payload: res.id})
                dispatch({type: 'setMessages', payload: [Separator(isYesterday('123', true)), ...messages]})
                await sendMessage(messageText, user.id, res.id, currentDialog)
                return
            }
        }
    }

    const onEnterPress = (e) => {
        if(e.code === 'Enter' && !isMobile){
            sendMessageLocal(e)
        }
    }

    const toggleAttachMenu = (e) => {
        e.preventDefault()
        attachIsActive? dispatch({type: "setAttachDisabled"}):dispatch({type: 'setAttachActive'})
    }

    /* UI */
    useEffect( () => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [messageText])
    /* UI */

    const mediaHandler = async (file) => {
        const form = new FormData()
        form.append('value', file)
        let response = await axios.post("/upload_file", form , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return new Promise((resolve, reject) => {
            resolve(response.data)
        })
    }

    const onSelectFile = async (e) => {
        e.stopPropagation()
        let response = await mediaHandler(e.target.files[0])
        axios({
            method: 'post',
            url: "/send_message",
            data: {
                sender_id: user.id,
                talk_id: lastTalk,
                dialog_id: currentDialog,
                message_type: 'media',
                value: response.file_id
              }
        }).then(res => console.log(res))
        .catch(error => console.log(error))      
    }

    const fileHandler = (e) => {
        e.stopPropagation()
        console.log('file loader clicked!')
    }


    return (
        <div className={classes.dialogWindow}>
            {isMobile ? '' :<Companion companion={companion} setActive={setActiveTalkMenu}/>}
            <MessageList active={active} getMessages={getMessages}/>
            <form   style={{marginInline: active? '15px' : '15%', visibility: user.currentDialog === -1 ? 'hidden' : 'visible'}} 
                    className={classes.txtArea}>
                <div    className={classes.wInputContainer} 
                        onClick={e => e.stopPropagation()}>
                    <textarea   id='input' 
                                ref={textareaRef} 
                                className={classes.wrapper} 
                                placeholder="Type a message" 
                                value={messageText} 
                                onKeyDown={onEnterPress} 
                                onChange={(e) => (setMessageText(e.target.value))}>
                    </textarea>
                    <button onClick={toggleAttachMenu} className={classes.attachButton}>
                        <img className={classes.inputAttachment} src={attach} alt=''/>
                    </button>
                    <div style={{display: attachIsActive ? 'flex' : 'none'}} className={classes.dropDownMenu}>
                        <input type="file" id="inputFile" onChange={onSelectFile}/>
                        <label className={classes.dropDownMenuItem} htmlFor="inputFile">Photo or video</label>
                        <button onClick={fileHandler} className={classes.dropDownMenuItem}>File</button>
                    </div>
                </div>
                <button className={classes.sendButton} onClick={(e) => (sendMessageLocal(e))}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow