const defaultState = {
    active: false
}

export const DISABLE_MENU = 'DISABLE_MENU'
export const ABLE_MENU = 'ABLE_MENU'

export const settingsReducer = (state = defaultState, action) => {
    switch(action.type){
        case DISABLE_MENU: 
            return {...state, active: false}
        case ABLE_MENU:
            return {...state, active: true}
        default: return state
    }
}

