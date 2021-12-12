import React, {useState, useEffect, useRef} from 'react'
import classes from './MainWindow.module.css'
import MessageList from '../MessageList/messageList'
import Companion from '../Companion/Companion'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import attach from './attach.svg'
 
const MainWindow = ({companion, sendMessage,active, setActiveTalkMenu, getMessages}) => {
    const dispatch = useDispatch()
    const textareaRef = useRef(null)
    const [messageText, setMessageText] = useState('')
    const [media, setMedia] = useState(null)
    const user = useSelector(state => state.user)
    const currentDialog = useSelector(state=> state.user.currentDialog)
    const lastTalk = useSelector(state => state.talks.lastTalk)
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

    const fileHandler = (e) => {
        e.stopPropagation()
        console.log('file loader clicked!')
    }

    const onSelectFile = async (e) => {
        setMedia(e.target.files[0])
        e.stopPropagation()
        let response = await mediaHandler(e.target.files[0])
        console.log(response)
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


    return (
        <div className={classes.dialogWindow}>
            <Companion companion={companion} setActive={setActiveTalkMenu}/>
            <MessageList active={active} getMessages={getMessages}/>
            <form style={{marginInline: active? '15px' : '15%', visibility: user.currentDialog === -1 ? 'hidden' : 'visible'}} className={classes.txtArea}>
                <div className={classes.wInputContainer} onClick={e => e.stopPropagation()}>
                    <textarea id='input' ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onKeyDown={onEnterPress} onChange={(e) => (setMessageText(e.target.value))}></textarea>
                    <button onClick={toggleAttachMenu} className={classes.attachButton}><img className={classes.inputAttachment} src={attach} alt=''/></button>
                    <div style={{display: attachIsActive ? 'flex' : 'none'}} className={classes.dropDownMenu} >
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