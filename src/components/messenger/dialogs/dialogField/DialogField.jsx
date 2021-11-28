import React, {useState, useEffect} from 'react'
import classes from './dialogsField.module.css'
import DialogItem from '../dialogItem/DialogItem'
import menu from './menu.svg'
import Search from '../Search/Search'
import unnamed from './unnamed.jpg'
import ProfileSetting from '../Settings/profileSettings/ProfileSettings'
import Settings from '../Settings/Settings'
import { useDispatch, useSelector } from 'react-redux';

function byField(field) {
    return (a, b) => +a[field] > +b[field] ? -1 : 1;
  }
  

const DialogsField = ({ dialogs, setLoggedOut, getTalks,getMessages, createDialog}) => {
    
    const dispatch = useDispatch()
    const act1ve = useSelector(state => state.settings.active)
    const user = useSelector(state => state.user)
    const currentDialog = useSelector(state=> state.user.currentDialog)
    
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
    const toggleDownMenu = () => {
        act1ve ? dispatch({type: 'DISABLE_MENU'}) : dispatch({type: 'ABLE_MENU'})
    }  
    /* UI */

    const changeDialog = async (id) => {
        dispatch({type:'setCurrentDialog', payload: id})
        let res = await getTalks(id)
        dispatch({type: 'setTalks', payload: res.talks.sort(byField("id")).reverse()})
        dispatch({type: 'setCurrentTalk', payload: res.talks.sort(byField("id")).reverse()[res.talks.length-1].id})
        let messages = await getMessages(res.talks.sort(byField("id")).reverse()[res.talks.length-1].id)
        dispatch({type: 'setMessages', payload: messages})
    }
    
    return (
        <div className={classes.Dialogs} id="leftColumn">
            <div className={classes.handlerRight} id="resizer"></div>


            <div style={{height: settings ? '10%' : '20%'}} className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}>
                    <div onClick={(e) => {e.stopPropagation()}}><button onClick={toggleDownMenu} className={classes.dropDownMenuButton}><img src={menu} alt=''/></button></div>
                    <div className={classes.dropDownMenu} style={{display: act1ve? 'flex' : 'none'}} onClick={(e) => {e.stopPropagation()}}>
                        <button className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => {setSettingsWindow(!settings); dispatch({type: 'DISABLE_MENU'})}}>Settings</button>
                        <a href="/un_authorize" className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => setLoggedOut(false)}>Log Out</a>
                    </div>
                    <div className={classes.userInfo} onClick={() => (dispatch({type: 'DISABLE_MENU'}))}><img src={unnamed} alt='' className={classes.userAvatar}/><h2>{user.name}</h2></div>
                </div>
                <Search createDialog={createDialog}/>
            </div>


            <div className={classes.DialogList} style={{height: settings ? '90%' : '80%'}}>
                {!settings ? 
                dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post?.id}
                        id={post?.id}
                        index={index}
                        name={post?.other_members?.length === 1 ? post?.other_members : 'Групповой диалог'}
                        lastTalk={post?.last_message ? post?.last_message : 'There is no messages'}
                        onclick={changeDialog}
                        current={currentDialog === post.id? true : false}
                        unreadCount = {post.unread_count}/>
                ))
                : <Settings setSettingsWindow={setSettingsWindow}/>
                }
            </div>
        </div>
    )
}

export default DialogsField;
