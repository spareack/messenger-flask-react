import React, {useState} from 'react'
import classes from './styles/dialogsField.module.css'
import DialogItem from './DialogItem'

const DialogsField = ({setDialog, dialogs, currentDialog, setTalk, setLoggedOut}) => {
    // const [_dialogs, setDialogs] = useState(dialogs)
    const [searchInput, setSearchInput] = useState('')

    const changeDialog = (id) => {
        setDialog(id)
        setTalk(null)
        console.log(id)
    }
    
    return (
        <div className={classes.Dialogs}>
            <div className={classes.searchBox}>
                <div className={classes.dialogFieldSBox}><h2>Search</h2> <button className={classes.logOutBtn} onClick={() => setLoggedOut(false)}>Log Out</button></div>
                <input className={classes.searchInput} placeholder='Write your talk here' value={searchInput} onChange={(e) => (setSearchInput(e.target.value))}></input>
            </div>
            <div className={classes.DialogList}>
                {dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post.id}
                        id={post.id}
                        index={index}
                        name={post.name}
                        lastTalk={post.talks[post.talks.length - 1].name}
                        onclick={changeDialog}
                        current={currentDialog === index? true : false}/>
                ))}
            </div>
        </div>
    )
}

export default DialogsField;
