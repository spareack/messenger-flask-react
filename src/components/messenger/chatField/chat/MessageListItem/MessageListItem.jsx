import React from 'react'
import classes from './MessageListItem.module.css'
import { useSelector } from 'react-redux'
import { Fade } from 'react-reveal'
import { Player, BigPlayButton } from 'video-react'
import "../../../../../../node_modules/video-react/dist/video-react.css"; 

const MessageListItem = ({from, type, center, value, name, time}) => {
    const styles = useSelector(state => state.UI)
    // console.log(type)
    const messageContent = (type, value) => {
        switch(type){
            case 'text':
                return (
                    <div className={from ? classes.right + ' ' + classes.msgListItem: (center ? classes.msgListItem + ' ' + classes.center :classes.left  + ' ' + classes.msgListItem)} >
                        <p style={{fontSize: styles.fontSize + 'px'}} className={classes.text}>
                            {value}
                            <span className={classes.time}>{time}</span>
                        </p>
                    </div>
                )
            case 'image':
                return (
                    <div className={from ? classes.right + ' ' + classes.msgListItemAttach: (center ? classes.msgListItemAttach + ' ' + classes.center :classes.left  + ' ' + classes.msgListItemAttach)} >
                        <img className={classes.imageAttach} src={'/get_file?file_id='+ value + "&purpose=chat"} alt=''/>
                        <span /*className={classes.time}*/>{time}</span>
                    </div>
                )
            case 'video':
                return (
                    <div className={from ? classes.right + ' ' + classes.msgListItemVideo: (center ? classes.msgListItemVideo + ' ' + classes.center :classes.left  + ' ' + classes.msgListItemVideo)} >
                        <Player
                        src={'/get_file?file_id='+ value + "&purpose=chat"}
                        >
                            <BigPlayButton position="center" />
                        </Player>
                        <span className={classes.time}>{time}</span>
                    </div>
                )
            default: 
                    return (
                        <div className={from ? classes.right + ' ' + classes.msgListItem: (center ? classes.msgListItem + ' ' + classes.center :classes.left  + ' ' + classes.msgListItem)} >
                            <p style={{fontSize: styles.fontSize + 'px'}} className={classes.text}>
                                Ошибка работы приложения! Сообщите об этом разработчику на почту ivan_kot2001@mail.ru.
                                <span className={classes.time}>{time}</span>
                            </p>
                        </div>
                    )
        }
    } 
    if(from){ return (
        <Fade right duration={400}>
            {messageContent(type, value)}
        </Fade>
    )} else return (
        <Fade left duration={400}>
            {messageContent(type, value)}
        </Fade>
    )
}

export default MessageListItem
