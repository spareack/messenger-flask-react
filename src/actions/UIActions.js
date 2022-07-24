import {
    SET_TEXT_COLOR,
    SET_BACKGROUNDMESSAGE,
    SET_FONT,
    SET_SOUND
} from '../store/UIReducer'

export const color = (payload) => ({type: SET_TEXT_COLOR, payload: payload})
export const fontSize = (payload) => ({type: SET_FONT, payload: payload})
export const backgroundMessage = (payload) => ({type: SET_BACKGROUNDMESSAGE, payload: payload})
export const background = (payload) => ({type: SET_TEXT_COLOR, payload: payload})
export const setSound = (payload) => ({type:SET_SOUND, payload: payload})
