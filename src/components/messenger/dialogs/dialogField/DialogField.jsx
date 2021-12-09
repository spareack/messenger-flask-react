import React, {useState, useEffect} from 'react'
import classes from './dialogsField.module.css'
import DialogItem from '../dialogItem/DialogItem'
import settingsIMG from './settings.svg'
import Search from '../Search/Search'
import unnamed from './unnamed.jpg'
import Settings from '../Settings/Settings'
import { useDispatch, useSelector } from 'react-redux';
import { Talk, Member, Message, Dialog, Separator } from '../../../constructor'

function byField(field) {
    return (a, b) => +a[field] > +b[field] ? -1 : 1;
  }
  

const DialogsField = ({ dialogs, setLoggedOut, getTalks,getMessages, createDialog, createTalk}) => {
    
    const dispatch = useDispatch()
    // const act1ve = useSelector(state => state.settings.active)
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
    
    

    // МОЁ ДРОП ДАУН МЕНЮ ОФИГЕННОЕ!!!
    // const toggleDownMenu = () => {
    //     act1ve ? dispatch({type: 'DISABLE_MENU'}) : dispatch({type: 'ABLE_MENU'})
    // }  

    {/* <div onClick={(e) => {e.stopPropagation()}}><button onClick={toggleDownMenu} className={classes.dropDownMenuButton}><img src={menu} alt=''/></button></div>
                    <div className={classes.dropDownMenu} style={{display: act1ve? 'flex' : 'none'}} onClick={(e) => {e.stopPropagation()}}>
                        <button className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => {setSettingsWindow(!settings); dispatch({type: 'DISABLE_MENU'})}}>Settings</button>
                        <a href="/un_authorize" className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => setLoggedOut(false)}>Log Out</a>
                    </div> */}
    /* UI */

    const changeDialog = async (id) => {
        dispatch({type:'setCurrentDialog', payload: id})

        let res = await getTalks(id)
        if(res.talks?.length){
            const lastTalkIndex = res.talks.length-1
            const sortedTalks = res.talks.sort(byField("id")).reverse()
            dispatch({type: 'setTalks', payload: sortedTalks})
            dispatch({type: 'setCurrentTalk', payload: sortedTalks[lastTalkIndex].id})
            dispatch({type: 'setLastTalk', payload: sortedTalks[lastTalkIndex].id})
            let messages = await getMessages(sortedTalks[lastTalkIndex].id)
            dispatch({type: 'setMessages', payload: messages})
            let totalMessages = [...messages]
            console.log(totalMessages)
            let loadedTalkId = lastTalkIndex
            while(totalMessages.length < 20){
                loadedTalkId = loadedTalkId - 1
                let nextMessages = await getMessages(sortedTalks[loadedTalkId]?.id)
                if(nextMessages){
                    let separator = new Separator(sortedTalks[loadedTalkId].title)
                    totalMessages = [...totalMessages, separator, ...nextMessages]
                    dispatch({type: 'setMessages', payload: totalMessages})
                } else break
            }
        } else {
            let newTalk = await createTalk('First talk!', id)
            dispatch({type: 'setCurrentTalk', payload: newTalk.id})
            dispatch({type: 'setLastTalk', payload: newTalk.id})
        }  
    }

    const getAvatar = (id) => {
        return '/get_file?file_id=' + id
    }
    
    return (
        <div className={classes.Dialogs} id="leftColumn">
            <div className={classes.handlerRight} id="resizer"></div>


            <div style={{height: settings ? '10%' : '20%'}} className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}>
                    <div onClick={(e) => {e.stopPropagation()}}><button className={classes.dropDownMenuButton} onClick={() => setSettingsWindow((settings => !settings))}><img src={settingsIMG} alt=''/></button></div>
                    <div className={classes.userInfo} onClick={() => (dispatch({type: 'DISABLE_MENU'}))}><img src={user.photoURL ? getAvatar(user.photoURL) : unnamed} alt='' className={classes.userAvatar}/><h2>{user.name}</h2></div>
                    {/* <a href="/un_authorize" className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => setLoggedOut(false)}>Log Out <img src={logout} alt=''/></a> */}
                </div>
                <Search createDialog={createDialog} settings={settings}/>
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
                        onclick={changeDialog}
                        current={currentDialog === post.id? true : false}
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
