import React, {useState,  useEffect } from 'react';
import './App.css';
import DialogsField from './components/messenger/dialogs/dialogField/DialogField';
import WorkSpace from './components/messenger/chatField/chat/workSpace/workSpace';
import axios from 'axios'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';

const socket = io('http://localhost:5000');

function Messenger({setLoggedOut}) {

  const dispatch = useDispatch() 
  
  /* UI */
  // const [unread, setUnread] = useState(true)
  const blurInput = () => {
    dispatch({type: 'searchInputChange', payload: ''})
    dispatch({type: 'DISABLE_NAMES'})
    dispatch({type: 'DISABLE_MENU'})
  }
  /* UI ends */
  
  const [talks, setTalks] = useState([])
  const [currentDialog, setCurrentDialog] = useState(0)
  const [currentTalk, setCurrentTalk] = useState(0)

  const user = useSelector(state => state.user)
  const messages = useSelector(state => state.messages.messages)
  const dialogs = useSelector(state => state.user.dialogs)

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
      console.log(res.data.talks)
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
      dispatch({type: 'setMessages', payload: res.data.messages.reverse()})
    })
    .catch(error => console.log(error))
  }

  const createDialog = (name, dialogID) => {
    dispatch({type: 'setUserDialogs', payload: [...dialogs, {id: dialogID, last_message: null, other_members: [name]}]})
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
        dispatch({type: 'setMessages', payload: [ {sender: user.id, value: messageText, date: res.data.date, id: res.data.id} ,...messages]})
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App" onClick={() => (blurInput())}>
      <DialogsField setDialog={setCurrentDialog} 
                    dialogs={dialogs} 
                    currentDialog={currentDialog} 
                    setTalk={setCurrentTalk} 
                    setLoggedOut={setLoggedOut} 
                    getTalks={getTalks}
                    createDialog={createDialog}
                    unread={true}
                    />

      <WorkSpace  id={currentDialog} 
                  companion={dialogs.find(Dialog => (Dialog.id === currentDialog))} 
                  talks={talks} 
                  currentTalk={currentTalk} 
                  setTalk={setCurrentTalk} 
                  getMsg={getMessages}
                  sendMessage={pushMessage}
                  createTalk={createTalk}/>
    </div>
  );
}

export default Messenger;
