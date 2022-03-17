const defaultState = {
    activeInput: false,
    value: '',
    names: []
}

const DISABLE_NAMES = 'DISABLE_NAMES'
const SHOW_NAMES = 'SHOW_NAMES'
const SEARCH_INPUT_CHANGE = 'searchInputChange'
const CHANGE_NAMES = 'changeNames'

export const searchReducer = (state = defaultState, action) => {
    switch(action.type){
        case DISABLE_NAMES: 
            return {...state, activeInput: false}
        case SHOW_NAMES:
            return {...state, activeInput: true}
        case SEARCH_INPUT_CHANGE:
            return {...state, value: action.payload}
        case CHANGE_NAMES:
            return {...state, names: action.payload}
        default: return state
    }
}

export const disableNames = () => ({type: DISABLE_NAMES})
export const showNames = () => ({type: SHOW_NAMES})
export const changeSearchInput = (payload) => ({type: SEARCH_INPUT_CHANGE, payload})
export const changeNames = (payload) => ({type: CHANGE_NAMES, payload})