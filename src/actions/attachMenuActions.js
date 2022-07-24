import {
    SET_ATTACH_ACTIVE,
    SET_ATTACH_DISABLED
} from '../store/attachMenuReducer'

export const setAttachActive = () => ({type: SET_ATTACH_ACTIVE})
export const setAttachDisabled = () => ({type: SET_ATTACH_DISABLED})