import React, {useState, useRef, useEffect} from 'react'
import MessageListItem from './MessageListItem'
import classes from './styles/MessageList.module.css'

const MessageList = ({messages, user, active}) => {
    const list = useRef(null)
    const [scroll, setScroll] = useState(0)
    const [scrollIsActive, setActiveScroll] = useState(false)

    const scrollToggler = () => {
        console.log(list)
        setActiveScroll((scrollIsActive) => (!scrollIsActive))
    }

    return (
        <div style={{paddingInline: active? '15px' : '15%'}} ref={list} className={!scrollIsActive ? classes.MessageList + ' ' + classes.MessageListNoScroll : classes.MessageList} /*onScroll={console.log(list.current)}*/ onMouseOver={scrollToggler} onMouseOut={scrollToggler}>
            {messages ?
            messages.map((msgItem, index) => 
                <MessageListItem from={user.id === msgItem.sender} text={msgItem.value} time={msgItem.date} key={index}/>
            )
            :<MessageListItem from={true} text={'Напишите этому человеку!'} time={'А это не важно'}/>}
        </div>
    )
}

export default MessageList
