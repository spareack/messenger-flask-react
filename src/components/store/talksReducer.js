const defaultState = {
    talks: []
}

export const talksReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'setTalks':
            return {...state, talks: action.payload}
        default:
            return state
    }
}