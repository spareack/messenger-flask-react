import React, {useState} from 'react'
import Particles from 'react-particles-js'
import { isMobile } from 'react-device-detect'
import MainWindow from '../ChatWindow/mainDialogWindow'
import Talks from '../../talks/talks'

import params from '../../../../particlesParams'

import classes from './workspace.module.css'

const WorkSpace = ({companion}) => {
    const [activeMenu, setActiveRightMenu] = useState(false)

    if(isMobile) return (
        <div className={classes.workTree} id='rightColumn'>
            <MainWindow companion={companion} active={activeMenu} setActiveTalkMenu={setActiveRightMenu}/>
        </div>
    )
    else return (
        <div className={classes.workTree} id='rightColumn'>
            <Particles className={classes.particles}
            params={params.coolSnow}/>
            <MainWindow companion={companion} active={activeMenu} setActiveTalkMenu={setActiveRightMenu}/>
            <Talks active={activeMenu} setActive={setActiveRightMenu}/>
        </div>
    )
}

export default WorkSpace;