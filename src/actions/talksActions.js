import {
    SET_TALKS,
    SET_CURRENT_TALK,
    SET_LAST_TALK
} from '../store/talksReducer'

export const setTalks = (payload) => ({type: SET_TALKS, payload})
export const setCurrentTalk = (payload) => ({type: SET_CURRENT_TALK, payload})
export const setLastTalk = (payload) => ({type: SET_LAST_TALK, payload})