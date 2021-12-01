import React, {useState, useEffect, useRef} from 'react'
import classes from './MainWindow.module.css'
import MessageList from '../MessageList/messageList'
import Companion from '../Companion/Companion'
import {useSelector} from 'react-redux'
import attach from './attach.svg'
 
const MainWindow = ({companion, sendMessage,active, setActiveTalkMenu, getMessages}) => {
    const textareaRef = useRef(null);
    const [messageText, setMessageText] = useState('')

    const user = useSelector(state => state.user)

    const sendMessageLocal = (e) => {
        e.preventDefault()
        setMessageText('');
        if(messageText !== '')sendMessage(messageText)
    }

    const onEnterPress = (e) => {
        if(e.code === 'Enter'){
            sendMessageLocal(e)
        }
    }

    /* UI */
    useEffect( () => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [messageText])
    /* UI */

    return (
        <div className={classes.dialogWindow}>
            <Companion companion={companion} setActive={setActiveTalkMenu}/>
            {/* <div className={classes.wtf}> */}
                <MessageList active={active} getMessages={getMessages}/>
            {/* </div> */}
            <form style={{marginInline: active? '15px' : '15%', visibility: user.currentDialog === -1 ? 'hidden' : 'visible'}} className={classes.txtArea}>
                <div className={classes.wInputContainer}>
                    <textarea id='input' ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onKeyDown={onEnterPress} onChange={(e) => (setMessageText(e.target.value))}></textarea>
                    <button onClick={(e) => {e.preventDefault()}} className={classes.attachButton}><img className={classes.inputAttachment} src={attach} alt=''/></button>
                </div>
                <button style={{display: 'none'}} className={classes.sendButton} onClick={(e) => (sendMessageLocal(e))}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow