import React, {useState} from 'react'
import classes from './styles/MainWindow.module.css'
import MessageList from './messageList'

const MainWindow = (props) => {
    const [messageText, setMessageText] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(messageText)
    }

    /* Dev test items */
    const messages = []


    /* Dev test items */

    return (
        <div className={classes.dialogWindow}> 
            <div className={classes.companion}> </div>
            <div className={classes.dialog}>
                <MessageList />
            </div>
            <form className={classes.txtArea}>
            <div className={classes.wInputContainer}>
                <div className={classes.wInputTextGroup}>
                    <div className={classes.wInputText} contentEditable={true} onInput={(e) => setMessageText(e.currentTarget.textContent)}></div>
                    <div className={classes.wPlaceholder}>Type a message</div>
                </div>
            </div>
            <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default MainWindow;