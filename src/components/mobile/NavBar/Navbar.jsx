import React from 'react'
import classes from './Navbar.module.css'

import { useSelector } from 'react-redux'

import chat from './chatbubbles.svg'
import friends from './person.svg'


const Navbar = ({active}) => {
    
  return (
    <div className={active ? classes.navbar : classes.none}>
        <img src={friends} alt='dialogs'/>
        <img src={chat} alt='chat'/>
    </div>
  )
}

export default Navbar