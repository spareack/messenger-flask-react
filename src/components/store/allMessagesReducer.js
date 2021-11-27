const defaultState = {
    messages: []
}

export const messagesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'setMessages':
            return {...state, messages: action.payload}
        default: return state
    }
}