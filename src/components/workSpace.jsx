import React, {useState} from 'react'
import '../App.css'
import classes from './styles/workspace.module.css'
import MainWindow from './mainDialogWindow'
import Talks from './talks'

const WorkSpace = ({id, talks}) => {
    const [currentTalk, setTalk] = useState(null)

    return (
        <div className={classes.workTree}>
            <MainWindow>

            </MainWindow>
            <Talks talks={talks}>

            </Talks>
            <p></p>
        </div>
    )
}

export default WorkSpace;
