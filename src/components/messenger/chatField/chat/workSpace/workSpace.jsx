import React, {useState} from 'react'
import classes from './workspace.module.css'
import MainWindow from '../ChatWindow/mainDialogWindow'
import Talks from '../../talks/talks'

const WorkSpace = ({id, companion, talks, currentTalk, setTalk, getMsg, sendMessage, createTalk}) => {
    const [activeMenu, setActiveRightMenu] = useState(false)
    const getMessages = (id) => {
        // setTalk(id)
        getMsg(id)
    }

    return (
        <div className={classes.workTree} id='rightColumn'>
            <MainWindow companion={companion} sendMessage={sendMessage} active={activeMenu} setActiveTalkMenu={setActiveRightMenu} getMessages={getMsg}/>
            <Talks  
                    current={currentTalk} 
                    setTalk={getMessages} 
                    createTalk={createTalk} 
                    currentDialog={id}
                    active={activeMenu} />
        </div>
    )
}

export default WorkSpace;