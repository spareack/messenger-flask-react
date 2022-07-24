const defaultState = {
    messages: []
}

export const SET_MESSAGES = 'setMessages'

export const messagesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_MESSAGES:
            return {...state, messages: action.payload}
        default: return state
    }
}

