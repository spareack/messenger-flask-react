import React, {useState, useRef, useEffect} from 'react'
import MessageListItem from '../MessageListItem/MessageListItem'
import { useDispatch, useSelector } from 'react-redux'

import { Separator } from '../../../../constructor'

import classes from './MessageList.module.css'
import mobile from './mobile.module.css'
import { isMobile } from 'react-device-detect'

const MessageList = ({active, getMessages}) => {
    const dispatch = useDispatch()
    const list = useRef(null)
    const [scrollIsActive, setActiveScroll] = useState(false)

    const user = useSelector(state => state.user)
    const messages = useSelector(state => state.messages.messages)
    const talks = useSelector(state => state.talks.talks)
    const currentTalk = useSelector(state => state.talks.currentTalk)

    const scrollToggler = () => {
        setActiveScroll((scrollIsActive) => (!scrollIsActive))
    }
    
    const messageFetching = async (condition) => {
        if (condition) {
            const currentTalkIndex = talks.findIndex( element => {return element.id === currentTalk})
            if (currentTalkIndex !== 0) {
                const fetchCurrentTalk = talks[currentTalkIndex-1].id
                dispatch({type: 'setCurrentTalk', payload: fetchCurrentTalk})
                let _messages = await getMessages(fetchCurrentTalk)
                let separator = new Separator(talks[currentTalkIndex-1].title)
                dispatch({type: 'setMessages', payload: [...messages, separator, ..._messages]})
            }
        }
    }


    useEffect(() => {
        list.current.scrollTo({top: 0, behavior: 'instant'})
    }, [user.currentDialog])

/*    const classHandler = () => {
        let result = classes.MessageList
        if(isMobile)result += ' ' + mobile.messageListM
        if(!scrollIsActive)result += ' ' + classes.MessageListNoScroll
        console.log(result, classes.MessageList + ' ' + classes.MessageListNoScroll + ' ' + mobile.messageListM)
        return result
    }*/

    const mainStyleHandler = () => {
        if (active) return {paddingInline: '15px'}
        else if (!isMobile) return {paddingInline: '15%'}
        else return {paddingInline: '0'}    
    }

    return (
        <div style={mainStyleHandler()} 
            ref={list} 
            className={!scrollIsActive ? classes.MessageList + ' ' + classes.MessageListNoScroll : classes.MessageList} 
            onScroll={() => messageFetching(Math.abs(list.current.scrollHeight + list.current.scrollTop - list.current.clientHeight) < 10)} 
            onMouseOver={scrollToggler} 
            onMouseOut={scrollToggler}>

            {messages 
            ? messages.map(msgItem =>
                <MessageListItem from={user.id == msgItem.sender} type={msgItem.type} center={msgItem.center ? msgItem.center : null} value={msgItem.value} time={msgItem.date} key={msgItem.id}/>
            )
            :<MessageListItem from={true} text={'Напишите этому человеку!'} time={'А это не важно'}/>}
        </div>
    )
}

export default MessageList
