import React, {useState} from 'react'
import classes from './styles/Search.module.css'
import axios from 'axios'
import unnamed from './unnamed.jpg'

const Search = ({user, createDialog, setInputActive, activeInput, searchInput, setSearchInput}) => {
    const [names, setNames] = useState([])
    // const [activeInput, setInputActive] = useState(false)

    const search = (e) => {
        if(e.target.value.length !== 0)axios({
            method: 'get',
            url: '/search_user',
            params: {
                value: e.target.value
            }
        })
        .then(res => {
            setNames(res.data.users)
        })
        .catch(error => console.log(error))
        else setNames([])
        setSearchInput(e.target.value)
    }

    const searchUser = (name, id) => {
        console.log(id, user.id)
        axios({
            method: 'post',
            url: "/create_dialog",
            data: {
                title: name,
                members: [user.id, id]
            }
        })
        .then(res => {
            if(res.data.status === 0)createDialog(name, res.data.id)
            else if(res.data.status === 1) alert('диалог занят крч')
            else if(res.data.status === 666) alert('пизда')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className={classes.searchBox}>
            <input onClick={(e) => (e.stopPropagation())} className={classes.searchInput} onFocus={() => (setInputActive(true))} placeholder="Search" value={searchInput} onChange={search}></input>
            <div className={classes.dropDownList} style={{display: searchInput.length && activeInput ? 'flex' : 'none'}}>
                <ul>
                    {names.length ? names.map( (name, index) => (
                        <SearchItem key={name.id} srcPath={name?.photoURL ? name.photoURL : unnamed} name={name.name} id={name.id} searchUser={searchUser}/>
                    )) : <li className={classes.searchItem}>Пользователь не найден</li>}
                </ul>
            </div>
        </div>
    )
}

export default Search

const SearchItem = ({srcPath, name, id, searchUser}) => {
    return (
    <li className={classes.searchItem} onClick={() => {searchUser(name, id)}}>
        <img height='30' width='30' style={{borderRadius: '75%'}} src={srcPath} alt=''/> <p>{name}</p>
    </li>
    )
}
