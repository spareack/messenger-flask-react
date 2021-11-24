import React, {useState, useEffect, useRef} from 'react'
import classes from './MainWindow.module.css'
import MessageList from '../MessageList/messageList'
import Companion from '../Companion/Companion'

const MainWindow = ({companion, sendMessage,active , setActiveTalkMenu}) => {
    const textareaRef = useRef(null);
    const [messageText, setMessageText] = useState('')

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
                <MessageList active={active}/>
            {/* </div> */}
            <form style={{marginInline: active? '15px' : '15%'}} className={classes.txtArea}>
                <div className={classes.wInputContainer}>
                    <textarea id='input' ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onKeyDown={onEnterPress} onChange={(e) => (setMessageText(e.target.value))}></textarea>
                </div>
                <button className={classes.sendButton} onClick={(e) => (sendMessageLocal(e))}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow