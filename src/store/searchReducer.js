const defaultState = {
    activeInput: false,
    value: '',
    names: []
}

export const DISABLE_NAMES = 'DISABLE_NAMES'
export const SHOW_NAMES = 'SHOW_NAMES'
export const SEARCH_INPUT_CHANGE = 'searchInputChange'
export const CHANGE_NAMES = 'changeNames'

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

