import React, {useState, useEffect, useRef} from 'react'
import classes from './MainWindow.module.css'
import MessageList from '../MessageList/messageList'
import Companion from '../Companion/Companion'
import {useSelector, useDispatch} from 'react-redux'
import attach from './attach.svg'
 
const MainWindow = ({companion, sendMessage,active, setActiveTalkMenu, getMessages}) => {
    const dispatch = useDispatch()
    const textareaRef = useRef(null)
    const [messageText, setMessageText] = useState('')
    const user = useSelector(state => state.user)
    const attachIsActive = useSelector(state => state.attachMenu.active)

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

    const mediaHandler = (e) => {
        e.stopPropagation()
        console.log('media handler clicked!!!')
    }

    const fileHandler = (e) => {
        e.stopPropagation()
        console.log('file loader clicked!')
    }

    return (
        <div className={classes.dialogWindow}>
            <Companion companion={companion} setActive={setActiveTalkMenu}/>
            <MessageList active={active} getMessages={getMessages}/>
            <form style={{marginInline: active? '15px' : '15%', visibility: user.currentDialog === -1 ? 'hidden' : 'visible'}} className={classes.txtArea}>
                <div className={classes.wInputContainer} onClick={e => e.stopPropagation()}>
                    <textarea id='input' ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onKeyDown={onEnterPress} onChange={(e) => (setMessageText(e.target.value))}></textarea>
                    <button onClick={toggleAttachMenu} className={classes.attachButton}><img className={classes.inputAttachment} src={attach} alt=''/></button>
                    <div style={{display: attachIsActive ? 'flex' : 'none'}} className={classes.dropDownMenu} >
                        <button onClick={mediaHandler} className={classes.dropDownMenuItem}>Photo or Video</button>
                        <button onClick={fileHandler} className={classes.dropDownMenuItem}>File</button>
                    </div>
                </div>
                <button className={classes.sendButton} onClick={(e) => (sendMessageLocal(e))}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow