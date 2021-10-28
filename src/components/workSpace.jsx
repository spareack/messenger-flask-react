import React, {useState} from 'react'
import '../App.css'
import classes from './styles/workspace.module.css'
import MainWindow from './mainDialogWindow'
import Talks from './talks'

const WorkSpace = ({id, companion, talks, currentTalk, setTalk}) => {
    return (
        <div className={classes.workTree}>
            <MainWindow companion={companion}>

            </MainWindow>
            <Talks talks={talks} current={currentTalk} setTalk={setTalk}>

            </Talks>
            <p></p>
        </div>
    )
}

export default WorkSpace;
