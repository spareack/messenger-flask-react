const defaultState = {
    active: true
}

const SET_ATTACH_ACTIVE = 'setAttachActive'
const SET_ATTACH_DISABLED = "setAttachDisabled"


export const attachMenuReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_ATTACH_ACTIVE:
            return {...state, active: true}
        case SET_ATTACH_DISABLED:
            return {...state, active: false}
        default: return state
    }
}