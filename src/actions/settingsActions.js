import {
    DISABLE_MENU,
    ABLE_MENU
} from '../store/settingsReducer'

export const disableMenu = () => ({type: DISABLE_MENU})
export const showMenu = () => ({type: ABLE_MENU})