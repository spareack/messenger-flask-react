import React, {useState} from 'react'
import '../App.css'
import DialogItem from './DialogItem'

const DialogsField = (props) => {


    return (
        <div className='Dialogs'>
            <div className='searchBox'>
                <h2>Search</h2>
                <input placeholder='Write your talk here'></input>
            </div>
            <div className='DialogList'>
                <ul>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                    <li><DialogItem /></li>
                </ul>
            </div>
        </div>
    )
}

export default DialogsField;
