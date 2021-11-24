import React, {useState,  useEffect } from 'react';
import './App.css';
import DialogsField from './components/DialogField';
import WorkSpace from './components/workSpace';
import axios from 'axios'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import {afkManager} from './afkManager';

const socket = io('http://localhost:5000');

function byField(field) {
  return (a, b) => +a[field] > +b[field] ? -1 : 1;
}

function Messenger({setLoggedOut}) {
  
  const dispatch = useDispatch() 
  
  /* UI */
  const [activeInput, setInputActive] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const blurInput = () => {
    setInputActive(false)
    setSearchInput('')
    setActiveMenu(false)
  }
  /* UI ends */
  // useEffect(() => afkManager(alert, 4, 2500, 'Не стой афк!'), [])
  // useEffect(()=> {console.log('Messenger mounted!')}, [])
  
  const [currentDialog, setCurrentDialog] = useState(0)
  const [currentTalk, setCurrentTalk] = useState(0)
  const [messages, setMessages] = useState([])

  const user = useSelector(state => state.user)
  const messages = useSelector(state => state.messages.messages)
  const dialogs = useSelector(state => state.user.dialogs)
  const talks = useSelector(state => state.talks.talks)

  const getMessages = (talkId) => {
    console.log(messages)
    axios({
      method: 'get',
      url: "/get_messages",
      params: {
        talk_id: talkId
      }
    })
    .then(res => {
      dispatch({type: 'setMessages', payload: res.data.messages.reverse()})
    })
    .catch(error => console.log(error))
  }

  const getTalks = (id) => {
    axios({
      method: 'get',
      url: '/get_talks',
      params: {
        dialog_id: id
      }
    })
    .then(res => {
      dispatch({type: 'setTalks', payload: res.data.talks.sort(byField("id")).reverse()})
      console.log(res.data.talks)
    })
    .catch(error => console.log(error))
    getMessages(talks[talks.length-1].id)
  }

  const createTalk = (name, dialogID) => {
    axios({
      method: 'POST',
      url: '/create_talk',
      data: {
        title: name,
        dialog_id: dialogID
      }
    })
    .then(res => {
      dispatch({type: 'setTalks', payload: [...talks, {id: res.data.id, title: name, messages: []}]})
    })
    .catch(error => console.log(error))
  }

  const createDialog = (name, dialogID) => {
    setDialogs([...dialogs, {id: dialogID, last_message: null, other_members: [name]}])
  } 

  const pushMessage = (messageText) => {
    axios({
      method:'post',
      url: "/send_message",
      data: {
        sender_id: user.id,
        talk_id: currentTalk,
        dialog_id: currentDialog,
        message_type: 'text',
        value: messageText
      }
    }).then(res => {
      if(!res.data.status){
        console.log(res.data)
        setMessages([ {sender: user.id, value: messageText, date: res.data.date, id: res.data.id} ,...messages])
      }
    })
    .catch(error => console.log(error))
    // console.log({
    //   sender_id: user.id,
    //   talk_id: currentTalk,
    //   message_type: 'text',
    //   value: messageText
    // }, messages)
    // setMessages([ {sender: user.id, value: messageText, date: '00:00'},...messages])
  }

  return (
    <div className="App" onClick={() => (blurInput())}>
      <DialogsField setDialog={setCurrentDialog} 
                    dialogs={dialogs} 
                    currentDialog={currentDialog} 
                    setTalk={setCurrentTalk} 
                    setLoggedOut={setLoggedOut} 
                    user={user} 
                    getTalks={getTalks}
                    getMessages={getMessages}
                    createDialog={createDialog}

                    activeInput={activeInput}
                    setInputActive={setInputActive}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    active={active}
                    setActiveMenu={setActiveMenu}/>

      <WorkSpace  id={currentDialog} 
                  companion={dialogs.find(Dialog => (Dialog.id === currentDialog))} 
                  currentTalk={currentTalk} 
                  setTalk={setCurrentTalk} 
                  getMsg={getMessages}
                  messages={messages}
                  sendMessage={pushMessage}
                  user={user}
                  createTalk={createTalk}/>
    </div>
  );
}

export default Messenger;
