import React, {useState} from 'react'
import '../App.css'
import classes from './styles/workspace.module.css'
import MainWindow from './mainDialogWindow'
import Talks from './talks'

const WorkSpace = ({id, companion, talks, currentTalk, setTalk, getMsg, messages, user, sendMessage, createTalk}) => {
    const getMessages = (id) => {
        setTalk(id)
        getMsg(id)
    }

    return (
        <div className={classes.workTree} id='rightColumn'>
            <MainWindow companion={companion} messages={messages} user={user} sendMessage={sendMessage}>

            </MainWindow>
            <Talks talks={talks} current={currentTalk} setTalk={getMessages} createTalk={createTalk} currentDialog={id}>

            </Talks>
            <p></p>
        </div>
    )
}

export default WorkSpace;
