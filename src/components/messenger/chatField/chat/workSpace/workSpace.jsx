import React, {useState} from 'react'
import Particles from 'react-particles-js'
import MainWindow from '../ChatWindow/mainDialogWindow'
import Talks from '../../talks/talks'

import params from '../../../../particlesParams'

import classes from './workspace.module.css'

const WorkSpace = ({companion}) => {
    const [activeMenu, setActiveRightMenu] = useState(false)

    return (
        <div className={classes.workTree} id='rightColumn'>
            <Particles className={classes.particles}
            params={params.coolSnow}/>
            <MainWindow companion={companion} active={activeMenu} setActiveTalkMenu={setActiveRightMenu}/>
            <Talks active={activeMenu} setActive={setActiveRightMenu}/>
        </div>
    )
}

export default WorkSpace;