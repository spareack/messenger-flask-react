const defaultState = {
    active: false,
    talksIsActive: true
}

const SET_ACTIVE = 'setCompanionActive'
const SET_DISABLED = 'setCompanionDisabled'
const SET_TALKS_ACTIVE = 'setTalksActive'
const SET_TALKS_DISABLED = 'setTalksDisabled'
 
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