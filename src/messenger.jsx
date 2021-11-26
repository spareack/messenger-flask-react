import React, {useState, useEffect } from 'react';
import './App.css';
import DialogsField from './components/messenger/dialogs/dialogField/DialogField';
import WorkSpace from './components/messenger/chatField/chat/workSpace/workSpace';
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
  // const [unread, setUnread] = useState(true)
  const blurInput = () => {
    dispatch({type: 'searchInputChange', payload: ''})
    dispatch({type: 'DISABLE_NAMES'})
    dispatch({type: 'DISABLE_MENU'})
  }
  /* UI ends */
  // useEffect(() => afkManager(alert, 4, 2500, 'Не стой афк!'), [])
  // useEffect(()=> {console.log('Messenger mounted!')}, [])
  useEffect(() => {
    socket.on('authorize', {user_id: user.id})
  }, [])

//    useEffect(() => {
//    socket.on("socket_info", msg => { console.log(msg); })
//    socket.emit('authorize', {id: user.id})
//  }, [])
  
  const [currentDialog, setCurrentDialog] = useState(0)
  // const [currentTalk, setCurrentTalk] = useState(0)

  const user = useSelector(state => state.user)
  const messages = useSelector(state => state.messages.messages)
  const dialogs = useSelector(state => state.user.dialogs)
  const talks = useSelector(state => state.talks.talks)
  const currentTalk = useSelector(state => state.talks.currentTalk)

  const getMessages = async (talkId) => {
    let response = await axios({
      method: 'get',
      url: "/get_messages",
      params: {
        talk_id: talkId
      }
    })
    // .then(res => {
    //   dispatch({type: 'setMessages', payload: res.data.messages.reverse()})
    // })
    // .catch(error => console.log(error))
    console.log(response.data)
    return new Promise((resolve, reject) => {
      resolve(response.data.messages.reverse())
    })
    
  }

  const getTalks = async (id) => {
    let response = await axios({
        method: 'get',
        url: '/get_talks',
        params: {
          dialog_id: id
        }
      })
      console.log(response.data)
    return new Promise((resolve, reject) => {
      resolve(response.data)
    })
    // .then(res => {
    //   dispatch({type: 'setTalks', payload: res.data.talks.sort(byField("id")).reverse()})
    //   dispatch({type: 'setCurrentTalk', payload: res.data.talks.sort(byField("id")).reverse()[res.data.talks.length-1].id})
    // })
    // .catch(error => console.log(error))
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
                    // setTalk={setCurrentTalk} 
                    setLoggedOut={setLoggedOut} 
                    getTalks={getTalks}
                    getMessages={getMessages}
                    createDialog={createDialog}
                    unread={true}
                    />

      <WorkSpace  id={currentDialog} 
                  companion={dialogs.find(Dialog => (Dialog.id === currentDialog))} 
                  currentTalk={currentTalk} 
                  // setTalk={setCurrentTalk} 
                  getMsg={getMessages}
                  sendMessage={pushMessage}
                  createTalk={createTalk}/>
    </div>
  );
}

export default Messenger;
