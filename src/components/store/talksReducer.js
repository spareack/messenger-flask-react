const defaultState = {
    talks: [],
    currentTalk: -1,
    lastTalk: -1
}

const SET_TALKS = 'setTalks'
const SET_CURRENT_TALK = 'setCurrentTalk'
const SET_LAST_TALK = 'setLastTalk'

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

export const setTalks = (payload) => ({type: SET_TALKS, payload})
export const setCurrentTalk = (payload) => ({type: SET_CURRENT_TALK, payload})
export const setLastTalk = (payload) => ({type: SET_LAST_TALK, payload})