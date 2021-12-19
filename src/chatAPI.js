import axios from 'axios'

export const getMessages = async (talkId) => {
    let response = await axios({
      method: 'get',
      url: "/get_messages",
      params: {
        talk_id: talkId
      }
    })
    if(response.data.messages !== undefined){
      return new Promise((resolve, reject) => {
        resolve(response.data.messages.reverse())
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    }

  }

export const getTalks = async (id) => {
    let response = await axios({
      method: 'get',
      url: '/get_talks',
      params: {
        dialog_id: id
      }
    })
    if(response.data.status === 0){
    return new Promise((resolve, reject) => {
      resolve(response.data)
    })
    } else {
      return new Promise((resolve, reject) => {
        resolve([{id: -1, title: 'Ошибка получения разговоров, сообщите об этом на ivan_kot2001@mail.ru'}])
      })
    }
  }

export const createTalk = async (name, dialogID) => {
    let response = await axios({
      method: 'POST',
      url: '/create_talk',
      data: {
        title: name,
        dialog_id: dialogID
      }
    })
    if(response.data.status === 0){
      return new Promise((resolve, reject) => {
        resolve(response.data)
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve([{id: -1, title: 'Ошибка создания разговора, сообщите об этом на ivan_kot2001@mail.ru'}])
      })
    }
  }

export const sendMessage = async (messageText, id, lastTalk, currentDialog) => {
    let response = await axios({
      method: 'post',
      url: "/send_message",
      data: {
        sender_id: id,
        talk_id: lastTalk,
        dialog_id: currentDialog,
        message_type: 'text',
        value: messageText
      }
    })
    return new Promise((resolve, reject) => {
      resolve(response.data.status)
    })
  }