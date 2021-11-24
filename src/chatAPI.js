import axios from 'axios'

export const getTalks = async (id) => {
    axios({
      method: 'get',
      url: '/get_talks',
      params: {
        dialog_id: id
      }
    })
    .then(res => {
        console.log(res.data.talks)
        return res.data.talks
    })
    .catch(error => console.log(error))
  }

export const createTalk = (name, dialogID) => {
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
      return {id: res.data.id, title: name, messages: []}
    })
    .catch(error => console.log(error))
  }

export const getMessages = (talkId) => {
    axios({
      method: 'get',
      url: "/get_messages",
      params: {
        talk_id: talkId
      }
    })
    .then(res => {
      return res.data.messages.reverse() 
    })
    .catch(error => console.log(error))
  }

export const pushMessage = (user, talkID, dialogID, messageText) => {
    axios({
      method:'post',
      url: "/send_message",
      data: {
        sender_id: user.id,
        talk_id: talkID,
        dialog_id: dialogID,
        message_type: 'text',
        value: messageText
      }
    }).then(res => {
      if(!res.data.status){
        return {sender: user.id, value: messageText, date: res.data.date, id: res.data.id}
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