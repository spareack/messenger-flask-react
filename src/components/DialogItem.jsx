import React from 'react'
import '../App.css'
import unnamed from '../unnamed.jpg'

const DialogItem = (props) => {
    return (
        <div className='dialog-item'>
            <div className='avatar'><img height='45' width='45' style={{borderRadius: '75%'}} src={unnamed} alt='???'/></div>
            <div>
                <h3>Имя человека</h3>
                <p>Название последнего РАЗГОВОРА</p>
            </div>
        </div>
    )
}

export default DialogItem;