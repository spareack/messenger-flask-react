const defaultState = {
    activeInput: false,
    value: ''
}

export const searchReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'DISABLE_NAMES': 
            return {...state, activeInput: false}
        case 'SHOW_NAMES':
            return {...state, activeInput: true}
        case 'searchInputChange':
            return {...state, value: action.payload}
        default: return state
    }

}