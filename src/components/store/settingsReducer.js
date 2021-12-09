const defaultState = {
    active: false
}

const DISABLE_MENU = 'DISABLE_MENU'
const ABLE_MENU = 'ABLE_MENU'

export const settingsReducer = (state = defaultState, action) => {
    switch(action.type){
        case DISABLE_MENU: 
            return {...state, active: false}
        case ABLE_MENU:
            return {...state, active: true}
        default: return state
    }
}

export const disableMenu = () => ({type: DISABLE_MENU})
export const showMenu = () => ({type: ABLE_MENU})