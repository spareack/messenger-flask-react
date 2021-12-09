import React from 'react'
import classes from './MessageListItem.module.css'
import { useSelector } from 'react-redux'
import {Fade} from 'react-reveal'

const MessageListItem = ({from,center, text, name, time}) => {
    const styles = useSelector(state => state.UI)
    if(from){ return (
        <Fade right duration={400}>
            <div className={from ? classes.right + ' ' + classes.msgListItem: (center ? classes.msgListItem + ' ' + classes.center :classes.left  + ' ' + classes.msgListItem)} >
                {/*<h3>{name}</h3>*/}
                <p style={{fontSize: styles.fontSize + 'px'}} className={classes.text}>{text}
                <span className={classes.time}>{time}</span>
                </p>
            </div>
        </Fade>
    )} else return (
        <Fade left duration={400}>
            <div className={from ? classes.right + ' ' + classes.msgListItem: (center ? classes.msgListItem + ' ' + classes.center :classes.left  + ' ' + classes.msgListItem)} >
                {/*<h3>{name}</h3>*/}
                <p style={{fontSize: styles.fontSize + 'px'}} className={classes.text}>{text}
                <span className={classes.time}>{time}</span>
                </p>
            </div>
        </Fade>
    )
    
}

export default MessageListItem
