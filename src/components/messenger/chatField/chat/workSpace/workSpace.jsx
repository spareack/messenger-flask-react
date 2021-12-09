import React, {useState} from 'react'
import classes from './workspace.module.css'
import MainWindow from '../ChatWindow/mainDialogWindow'
import Talks from '../../talks/talks'
import Particles from 'react-particles-js'
import params from '../../../../particlesParams'

const WorkSpace = ({id, companion, currentTalk, getMsg, sendMessage, createTalk}) => {
    const [activeMenu, setActiveRightMenu] = useState(false)
    const getMessages = (id) => {
        getMsg(id)
    }

    return (
        <div className={classes.workTree} id='rightColumn'>
            <Particles className={classes.particles}
            params={params.coolSnow}/>
            <MainWindow companion={companion} sendMessage={sendMessage} active={activeMenu} setActiveTalkMenu={setActiveRightMenu} getMessages={getMsg}/>
            <Talks current={currentTalk} setTalk={getMessages} createTalk={createTalk} currentDialog={id} active={activeMenu}/>
        </div>
    )
}

export default WorkSpace;