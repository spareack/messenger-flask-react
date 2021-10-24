import React from 'react'
import './styles/dialog-item.css'
import unnamed from '../unnamed.jpg'

const DialogItem = ({id, index, name, lastTalk, onclick}) => {

    const sendID = () => {
        onclick(index)
    }

    return (
        <div className='dialog-item' onClick={sendID}>
            <div className='avatar'><img src={unnamed} alt='???'/></div>
            <div className='dialogItemText'>
                <h3>{name}</h3>
                <p>{lastTalk}</p>
            </div>
        </div>
    )
}

export default DialogItem;