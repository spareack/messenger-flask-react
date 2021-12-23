const defaultState = {
    fontSize: 16,
    color: '#FFFFF1',
    backgroundColorMessage: '#333',
    backgroundColorWindow: '#0F0F0F',
    sound: true
}

const SET_FONT = 'setFontSize'
const SET_BACKGROUNDMESSAGE = 'setBackgroundColorForMessage'
const SET_BACKGROUNDCOLOR = 'setBackgroundColor'
const SET_TEXT_COLOR = 'setColor'
const SET_SOUND = 'setSound'

export const UIReducer = (state = defaultState, action) => {
    switch(action.type){
        case SET_FONT: 
            return {...state, fontSize: action.payload}
        case SET_BACKGROUNDCOLOR:
            return {...state, backgroundColorWindow: action.payload}
        case SET_BACKGROUNDMESSAGE:
            return {...state, backgroundColorMessage: action.payload}
        case SET_TEXT_COLOR:
            return {...state, color: action.payload}
        case SET_SOUND:
            return {...state, color: action.payload}
        default: return state
    }
}

export const color = (payload) => ({type: SET_TEXT_COLOR, payload: payload})
export const fontSize = (payload) => ({type: SET_FONT, payload: payload})
export const backgroundMessage = (payload) => ({type: SET_BACKGROUNDMESSAGE, payload: payload})
export const background = (payload) => ({type: SET_TEXT_COLOR, payload: payload})
export const setSound = (payload) => ({type:SET_SOUND, payload: payload})
