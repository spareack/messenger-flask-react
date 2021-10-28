import React, {useState, useEffect, useRef} from 'react'
import classes from './styles/MainWindow.module.css'
import MessageList from './messageList'
import unnamed from './unnamed.jpg'

const MainWindow = ({companion}) => {
    const textareaRef = useRef(null);
    const [messageText, setMessageText] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(messageText)
        setMessageText('');
    }

    /* Dev test items */
    const messages = []


    /* Dev test items */
    useEffect(()=> {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [messageText])

    return (
        <div className={classes.dialogWindow}> 
            <div className={classes.companion}>
                {companion.photoURL === undefined
                ? <div className={classes.avatar}><img src={unnamed}/></div>
                : <div className={classes.avatar}><img src={companion.photoURL}/></div>
                }
                <h2>{companion.name}</h2>
            </div>
            <div className={classes.dialog}>
                <MessageList />
            </div>
            <form className={classes.txtArea}>
            <div className={classes.wInputContainer}>
                    {/*<div className={classes.wInputText} contentEditable={true} onInput={(e) => setMessageText(e.currentTarget.textContent)}></div>
                    <div className={classes.wPlaceholder}>Type a message</div>*/}
                    <textarea ref={textareaRef} className={classes.wrapper} placeholder="Type a message" value={messageText} onChange={(e) => (setMessageText(e.target.value))}></textarea>
            </div>
            <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow;