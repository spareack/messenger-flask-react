const defaultState = {
    active: false,
    talksIsActive: true
}

export const SET_ACTIVE = 'setCompanionActive'
export const SET_DISABLED = 'setCompanionDisabled'
export const SET_TALKS_ACTIVE = 'setTalksActive'
export const SET_TALKS_DISABLED = 'setTalksDisabled'
 
export const companionReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_ACTIVE:
            return {...state, active: true}
        case SET_DISABLED: 
            return {...state, active: false}
        case SET_TALKS_ACTIVE: 
            return {...state, talksIsActive: true}
        case SET_TALKS_DISABLED: 
            return {...state, talksIsActive: false}
        default: return state
    }
}