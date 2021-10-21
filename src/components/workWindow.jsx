import React, {useState} from 'react'
import '../App.css'
import MainWindow from './mainDialogWindow'

const WorkSpace = (props) => {
    const [currentTalk, setTalk] = useState(null)

    return (
        <div className='work-tree'>
            <MainWindow>

            </MainWindow>
            <div className='talks'>

            </div>
        </div>
    )
}

export default WorkSpace;
