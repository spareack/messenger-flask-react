import React, {useState, useEffect, useRef} from 'react'
import classes from './styles/MainWindow.module.css'
import MessageList from './messageList'
import unnamed from './unnamed.jpg'

const MainWindow = ({companion, messages, user, sendMessage}) => {
    const textareaRef = useRef(null);
    const [messageText, setMessageText] = useState('')

    const sendMessageLocal = (e) => {
        e.preventDefault()
        setMessageText('');
        sendMessage(messageText)
    }

    const timeNow = () => {
        let time = new Date()
        return time.toTimeString()
    }
    

    useEffect(()=> {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
        
    }, [messageText])

    return (
        <div className={classes.dialogWindow}> 
            <div className={classes.companion}>
                {companion?.photoURL === undefined
                ? <div className={classes.avatar}><img src={unnamed}/></div>
                : <div className={classes.avatar}><img src={companion.photoURL}/></div>
                }
                <div><h2>{companion?.other_members.length === 1? companion?.other_members: 'Название группового разговора'}</h2>
                <p>last seen recently</p></div>
            </div>
            <MessageList messages={messages} user={user}/>
            <form className={classes.txtArea}>
            <div className={classes.wInputContainer}>
                <textarea ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onChange={(e) => (setMessageText(e.target.value))}></textarea>
            </div>
            <button onClick={sendMessageLocal}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow