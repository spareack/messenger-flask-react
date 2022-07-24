const defaultState = {
    fontSize: 16,
    color: '#FFFFF1',
    backgroundColorMessage: '#333',
    backgroundColorWindow: '#0F0F0F',
    sound: true
}

export const SET_FONT = 'setFontSize'
export const SET_BACKGROUNDMESSAGE = 'setBackgroundColorForMessage'
export const SET_BACKGROUNDCOLOR = 'setBackgroundColor'
export const SET_TEXT_COLOR = 'setColor'
export const SET_SOUND = 'setSound'

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

