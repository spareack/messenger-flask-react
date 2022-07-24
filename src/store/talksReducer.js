const defaultState = {
    talks: [],
    currentTalk: -1,
    lastTalk: -1
}

export const SET_TALKS = 'setTalks'
export const SET_CURRENT_TALK = 'setCurrentTalk'
export const SET_LAST_TALK = 'setLastTalk'

export const talksReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_TALKS:
            return {...state, talks: action.payload}
        case SET_CURRENT_TALK:
            return {...state, currentTalk: action.payload}
        case SET_LAST_TALK: 
            return {...state, lastTalk: action.payload}
        default:
            return state
    }
}

