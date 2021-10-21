import React, {useState} from 'react'
import '../App.css'

const MainWindow = (props) => {
    const [messageText, setMessageText] = useState('')

    return (
        <div className="dialog-window"> 
            <div className='dialog'></div>
            <form className='txtArea'>
                <textarea rows="7" cols="45" style={{resize: 'none'}} placeholder='Введите сообщение' value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>
                <button onClick={(e) => {
                    console.log(messageText);
                    e.preventDefault()
                    setMessageText('')
                }}>Отправить блять!</button>
            </form>
        </div>
    )
}

export default MainWindow;