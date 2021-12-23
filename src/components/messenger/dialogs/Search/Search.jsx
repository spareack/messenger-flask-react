import React, {useState} from 'react'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchInput } from '../../../store/searchReducer';

import {Member, Dialog} from '../../../constructor'

import classes from './Search.module.css'
import unnamed from './unnamed.jpg'

const Search = ({settings}) => {
    const [names, setNames] = useState([])

    const user = useSelector(state => state.user)
    const searchInput = useSelector(state => state.search.value)
    const activeInput = useSelector(state => state.search.activeInput)
    const dialogs = useSelector(state => state.user.dialogs)
    const dispatch = useDispatch()

    const search = (e) => {
        if(e.target.value.length !== 0){
            axios({
                method: 'get',
                url: '/search_user',
                params: {
                    value: e.target.value
                }
            })
            .then(res => {
                console.log(res.data)
                setNames(res.data.users)
            })
            .catch(error => console.log(error))
        } else setNames([])

        dispatch(changeSearchInput(e.target.value))
    }

    const searchUser = (name, id) => {
        axios({
            method: 'post',
            url: "/create_dialog",
            data: {
                title: name,
                members: [user.id, id]
            }
        })
        .then(res => {
            console.log(name, res.data.id)
            if(res.data.status === 0)dispatch({ type: 'setUserDialogs', payload: [...dialogs, new Dialog(res.data.id, null, [new Member(null, name, 0)])] })
            else if(res.data.status === 1) alert('диалог занят')
            else if(res.data.status === 666) alert('Ошибка')
        })
        .catch(error => console.log(error))
    }

    function getAvatar(id) {
        return id ? '/get_file?file_id=' + id : unnamed
    }

    return (
        <div className={classes.searchBox}>
            <input  onClick={(e) => (e.stopPropagation())} 
                    style={{opacity: settings ? 0 : 1}} 
                    className={classes.searchInput} 
                    onFocus={() => (dispatch({type: 'SHOW_NAMES'}))} 
                    placeholder="Search" 
                    value={searchInput} 
                    onChange={search}/>
            <div className={classes.dropDownList} style={{display: searchInput.length && activeInput ? 'flex' : 'none'}}>
                <ul>
                    {names.length 
                    ? names.map((name, index) => (
                        <SearchItem key={name.id} 
                                    srcPath={getAvatar(name.avatar_id)} 
                                    name={name.name} 
                                    id={name.id} 
                                    searchUser={searchUser} 
                                    isOnline={name.user_status}/>
                    )) 
                    : <li className={classes.searchItem}>Пользователь не найден</li>}
                </ul>
            </div>
        </div>
    )
}

export default Search

const SearchItem = ({srcPath, name, id, searchUser, isOnline}) => {
    return (
    <li className={classes.searchItem} onClick={() => {searchUser(name, id)}}>
        <div className={classes.searchImage}>
            <img    height='30' 
                    width='30' 
                    style={{borderRadius: '75%'}} 
                    src={srcPath} alt=''/>
            <span style={{display: isOnline ? 'flex': 'none'}} className={classes.isOnline}>•</span>
        </div>
        <p>{name}</p>
    </li>
    )
}
