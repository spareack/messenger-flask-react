import React from 'react'
import classes from '../styles/Navbar.module.css'

import { useDispatch, useSelector } from 'react-redux'

import chat from '../assets/chatbubbles.svg'
import friends from '../assets/person.svg'


const Navbar = ({active}) => {
    
    return (
        <div className={active ? classes.navbar : classes.none}>
            <img src={friends} alt='dialogs'/>
            <img src={chat} alt='chat'/>
        </div>
  )
}

export default Navbar