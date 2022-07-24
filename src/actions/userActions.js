import {
    SET_USER,
    SET_USER_ID,
    SET_USER_CURRENT_DIALOG,
    SET_USER_DIALOGS,
    SET_USER_PHOTO,
    SET_USER_NAME
} from '../store/userReducer'

export const setUser = (payload) => ({type: SET_USER, payload})
export const setUserID = (payload) => ({type: SET_USER_ID, payload})
export const setUserName = (payload) => ({type: SET_USER_NAME, payload})
export const setUserDialogs = (payload) => ({type: SET_USER_DIALOGS, payload})
export const setUserCurrentDialog = (payload) => ({type: SET_USER_CURRENT_DIALOG, payload})
export const setUserPhoto = (payload) => ({type: SET_USER_PHOTO, payload})