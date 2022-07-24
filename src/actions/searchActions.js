import {
    DISABLE_NAMES,
    SHOW_NAMES,
    SEARCH_INPUT_CHANGE,
    CHANGE_NAMES
} from '../store/searchReducer'

export const disableNames = () => ({type: DISABLE_NAMES})
export const showNames = () => ({type: SHOW_NAMES})
export const changeSearchInput = (payload) => ({type: SEARCH_INPUT_CHANGE, payload})
export const changeNames = (payload) => ({type: CHANGE_NAMES, payload})