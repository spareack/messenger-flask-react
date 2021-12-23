import React, {useState, useEffect} from 'react'
import DialogItem from '../dialogItem/DialogItem'
import Search from '../Search/Search'
import Settings from '../Settings/Settings'

import { useDispatch, useSelector } from 'react-redux';
import { setTalks, setCurrentTalk, setLastTalk } from '../../../store/talksReducer';

import { Separator } from '../../../constructor'
import {getMessages, createTalk, getTalks} from '../../../../chatAPI'

import classes from './dialogsField.module.css'
import settingsIMG from './settings.svg'
import unnamed from './unnamed.jpg'

// функция сортировки массива объектов по полю, с числовым значением
function byField(field) {
    return (a, b) => +a[field] > +b[field] ? -1 : 1;
  }

const DialogsField = ({setLoggedOut}) => {
    
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const currentDialog = useSelector(state=> state.user.currentDialog)
    const dialogs = useSelector(state => state.user.dialogs)

    const [settings, setSettingsWindow] = useState(false)
    /* UI */
    useEffect( () => {
        const container = document.getElementById('leftColumn')
        const rightColumg = document.getElementById('rightColumn')
        const handler = document.getElementById("resizer")
        handler.addEventListener('dblclick', (e) => {
            rightColumg.style.width = 100 + '%'
            container.style.width = 30 + '%';
        })
        handler.addEventListener('mousedown', rightMouseDown);
        function rightMouseDown(e) {
          e.preventDefault();
          document.onmousemove = rightElementDrag;
          document.onmouseup = closeDragElement;
        }
        function rightElementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          
          const width = e.clientX;
          rightColumg.style.width = `calc(100% - ${width}px)`
          container.style.width = width + 'px';
        }
        
        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
        
      }, []) 

    // самая сложная функция этого проекта
    // изменяется currentDialog на новый кликнутый, получаются разговоры оттуда, потом по тем разговорам получаются
    // получаются сообщения, и если их меньше, чем нужно для появления полосы прокрутки, то подгружаются следующие 
    // до тех пор, пока они не закончатся или пока полоса не появится
    // примерно их 20 штук, но мониторы разные, поэтому стоит сделать 40
    // в случае отсутствия разговоров создаётся разговор 'First Talk'
    const changeDialog = async (id) => {
        dispatch({type:'setCurrentDialog', payload: id})
        let res = await getTalks(id)
        if(res.talks?.length){
            const lastTalkIndex = res.talks.length-1
            const sortedTalks = res.talks.sort(byField("id")).reverse()

            dispatch(setTalks(sortedTalks))
            dispatch(setCurrentTalk(sortedTalks[lastTalkIndex].id))
            dispatch(setLastTalk(sortedTalks[lastTalkIndex].id))

            let messages = await getMessages(sortedTalks[lastTalkIndex].id)
            dispatch({type: 'setMessages', payload: messages})

            let totalMessages = [...messages]
            let loadedTalkId = lastTalkIndex
            
            while(totalMessages.length < 20){
                loadedTalkId = loadedTalkId - 1
                let nextMessages = await getMessages(sortedTalks[loadedTalkId]?.id)
                if(nextMessages){
                    let separator = new Separator(sortedTalks[loadedTalkId+1].title)
                    totalMessages = [...totalMessages, separator, ...nextMessages]
                    dispatch({type: 'setMessages', payload: totalMessages})
                } else break
            }
        } else {
            let newTalk = await createTalk('First talk!', id)
            dispatch(setCurrentTalk(newTalk.id))
            dispatch(setLastTalk(newTalk.id))
        }  
    }

    const getAvatar = (id) => {
        return id ? '/get_file?file_id=' + id : unnamed
    }
    
    return (
        <div className={classes.Dialogs} id="leftColumn">
            <div className={classes.handlerRight} id="resizer"></div>

            <div style={{height: settings ? '10%' : '20%'}} className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}>
                    <div onClick={(e) => {e.stopPropagation()}}>
                        <button className={classes.dropDownMenuButton} onClick={() => setSettingsWindow((settings => !settings))}>
                            <img src={settingsIMG} alt=''/>
                        </button>
                    </div>
                    <div className={classes.userInfo} onClick={() => (dispatch({type: 'DISABLE_MENU'}))}>
                        <img src={getAvatar(user.photoURL)} alt='' className={classes.userAvatar}/>
                        <h2>{user.name}</h2>
                    </div>
                </div>
                <Search settings={settings}/>
            </div>

            <div className={classes.DialogList} style={{height: settings ? '90%' : '80%'}}>
                {!settings ? 
                dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post?.id} 
                        id={post?.id}
                        index={index}
                        name={post?.other_members?.length === 1 ? post?.other_members[0].name : 'Групповой диалог'}
                        lastTalk={post?.last_message ? post?.last_message : 'There is no messages'}
                        changeDialog={changeDialog}
                        current={currentDialog === post.id}
                        unreadCount = {post.unread_count}
                        online={post?.other_members.length === 1 ? post?.other_members[0].user_status : undefined}
                        otherMembers={post?.other_members}/>
                ))
                : <Settings setSettingsWindow={setSettingsWindow} setLoggedOut={setLoggedOut} active={settings}/>
                }
            </div>
        </div>
    )
}

export default DialogsField;
