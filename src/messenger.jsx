import React, {useState,  useEffect } from 'react';
import './App.css';
import DialogsField from './components/DialogField';
import WorkSpace from './components/workSpace';
import axios from 'axios'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000');

function Messenger({dialogs, setLoggedOut, user, setDialogs}) {
  
  /* UI */
  const [activeInput, setInputActive] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const blurInput = () => {
    setInputActive(false)
    setSearchInput('')
    setActiveMenu(false)
  }
  const [active, setActiveMenu] = useState(false)

  /* UI */
  const [talks, setTalks] = useState([])
  const [currentDialog, setCurrentDialog] = useState(0)
  const [currentTalk, setCurrentTalk] = useState(0)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(user.id !== -1){
      socket.emit('authorize', {id: user.id});
      socket.on('socket_info', msg => {
        console.log(msg)
      })
    }
  }, []);

  const getTalks = (id) => {
    axios({
      method: 'get',
      url: '/get_talks',
      params: {
        dialog_id: id
      }
    })
    .then(res => {
      setTalks(res.data.talks)
    })
    .catch(error => console.log(error))
  }

  const createTalk = (name, dialogID) => {
    axios({
      method: 'POST',
      url: '/create_talk',
      data: {
        title: name,
        // members: user.id, id,
        dialog_id: dialogID
      }
    })
    .then(res => {
      setTalks([...talks, {id: res.data.id, title: name, messages: []}])
    })
    .catch(error => console.log(error))
  }

  const getMessages = (talkId) => {
    axios({
      method: 'get',
      url: "/get_messages",
      params: {
        talk_id: talkId
      }
    })
    .then(res => {
      setMessages(res.data.messages.reverse())
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
                    createDialog={createDialog}

                    activeInput={activeInput}
                    setInputActive={setInputActive}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    active={active}
                    setActiveMenu={setActiveMenu}/>

      <WorkSpace  id={currentDialog} 
                  companion={dialogs.find(Dialog => (Dialog.id === currentDialog))} 
                  talks={talks} 
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
