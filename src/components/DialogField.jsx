import React, {useState} from 'react'
import classes from './styles/dialogsField.module.css'
import DialogItem from './DialogItem'

const DialogsField = ({setDialog, dialogs}) => {
    const [_dialogs, setDialogs] = useState(dialogs)
    const [searchInput, setSearchInput] = useState('')

    const changeDialog = (id) => {
        setDialog(id)
        console.log(id)
    }
    
    return (
        <div className={classes.Dialogs}>
            <div className={classes.searchBox}>
                <h2>Search</h2>
                <input className={classes.searchInput} placeholder='Write your talk here' value={searchInput} onChange={(e) => (setSearchInput(e.target.value))}></input>
            </div>
            <div className={classes.DialogList}>
                {_dialogs.map((post, index)=> (
                    <DialogItem 
                        key={post.id}
                        id={post.id}
                        index={index}
                        name={post.name}
                        lastTalk={post.talks[post.talks.length - 1].name}
                        onclick={changeDialog}/>
                ))}
            </div>
        </div>
    )
}

export default DialogsField;
