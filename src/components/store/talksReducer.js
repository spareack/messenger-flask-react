const defaultState = {
    talks: [],
    currentTalk: 0,
    lastTalk: 0
}

export const talksReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'setTalks':
            return {...state, talks: action.payload}
        case 'setCurrentTalk':
            return {...state, currentTalk: action.payload}
        case 'setLastTalk': 
            return {...state, lastTalk: action.payload}
        default:
            return state
    }
}