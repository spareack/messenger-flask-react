const defaultState = {
    photoURL: 0,
    id: 0,
    name: 'none',
    bio: '',
    dialogs: [],
    currentDialog: -1
}

const SET_USER = 'setUser'
const SET_USER_ID = 'setUserId'
const SET_USER_NAME = 'setUserName'
const SET_USER_DIALOGS = 'setUserDialogs'
const SET_USER_CURRENT_DIALOG = 'setCurrentDialog'
const SET_USER_PHOTO = 'setUserPhoto'

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_USER: 
            return {...state, id: action.payload.id, name: action.payload.name, photoURL: action.payload?.photoURL, dialogs: action.payload.dialogs ? action.payload.dialogs : []}
        case SET_USER_ID:
            return {...state, id: action.payload}
        case SET_USER_NAME: 
            return {...state, name: action.payload}
        case SET_USER_DIALOGS: 
            return {...state, dialogs: action.payload}
        case SET_USER_CURRENT_DIALOG:
            return {...state, currentDialog: action.payload}
        case SET_USER_PHOTO:
            return {...state, photoURL: action.payload}
        default: return state
    }
}

export const setUser = (payload) => ({type: SET_USER, payload})
export const setUserID = (payload) => ({type: SET_USER_ID, payload})
export const setUserName = (payload) => ({type: SET_USER_NAME, payload})
export const setUserDialogs = (payload) => ({type: SET_USER_DIALOGS, payload})
export const setUserCurrentDialog = (payload) => ({type: SET_USER_CURRENT_DIALOG, payload})
export const setUserPhoto = (payload) => ({type: SET_USER_PHOTO, payload})