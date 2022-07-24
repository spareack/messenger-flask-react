import {
    SET_ACTIVE,
    SET_DISABLED,
    SET_TALKS_ACTIVE,
    SET_TALKS_DISABLED
} from '../store/companionMenuReducer'

export const setCompanionActive = () => ({type: SET_ACTIVE})
export const setCompanionDisabled = () => ({type: SET_DISABLED})
export const setTalksActive = () => ({type: SET_TALKS_ACTIVE})
export const setTalksDisabled = () => ({type: SET_TALKS_DISABLED})