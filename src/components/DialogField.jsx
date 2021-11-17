import React, {useState, useEffect} from 'react'
import classes from './styles/dialogsField.module.css'
import DialogItem from './DialogItem'
import menu from '../menu.svg'
import Search from './Search'
import unnamed from './unnamed.jpg'
import Setting from './Setting'

const DialogsField = ({
    setDialog, 
    dialogs, 
    currentDialog, 
    setTalk, 
    setLoggedOut, 
    user, 
    getTalks, 
    createDialog,

    activeInput,
    setInputActive, 
    searchInput,
    setSearchInput,
    active,
    setActiveMenu
    }) => {

    // const [_dialogs, setDialogs] = useState(dialogs)


    /* UI */
    
    const [settings, setSettingsWindow] = useState(false)
    
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

    const toggleDownMenu = (e) => {
        setActiveMenu((active) => (!active))
    }  
    /* UI */

    const changeDialog = (id) => {
        setDialog(id)
        setTalk(null)
        getTalks(id)
    }
    
    return (
        <div className={classes.Dialogs + ' ' + classes.resizableBox} id="leftColumn">
            <div className={classes.handlerRight} id="resizer"></div>


            <div className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}>
                    <div onClick={(e) => {e.stopPropagation()}}><button onClick={toggleDownMenu} className={classes.dropDownMenuButton}><img src={menu}/></button></div>
                    <div className={classes.dropDownMenu} style={{display: active? 'flex' : 'none'}} onClick={(e) => {e.stopPropagation()}}>
                        <a className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => {setSettingsWindow(!settings); setActiveMenu(false)}}>Settings</a>
                        <a href="/un_authorize" className={classes.logOutBtn + ' ' + classes.menuButton} onClick={() => setLoggedOut(false)}>Log Out</a>
                    </div>
                    <div className={classes.userInfo} onClick={() => (setActiveMenu(false))}><img src={unnamed} className={classes.userAvatar}/><h2>{user.name}</h2></div>
                </div>
                {/* <a href="/un_authorize" className={classes.logOutBtn} onClick={() => setLoggedOut(false)}>Log Out</a> */}
                <Search user={user} createDialog={createDialog} setInputActive={setInputActive} activeInput={activeInput} searchInput={searchInput} setSearchInput={setSearchInput}/>
            </div>


            <div className={classes.DialogList}>
                {!settings ? 
                dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post.id}
                        id={post.id}
                        index={index}
                        name={post.other_members.length === 1 ? post.other_members : 'Групповой диалог'}
                        lastTalk={post.last_message ? post.last_message : 'There is no messages'}
                        onclick={changeDialog}
                        current={currentDialog === post.id? true : false}/>
                ))
                : <Setting user={user} setSettingsWindow={setSettingsWindow}/>
                }
            </div>
        </div>
    )
}

export default DialogsField;
