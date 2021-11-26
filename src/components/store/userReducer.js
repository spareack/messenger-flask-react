const defaultState = {
    photoURL: 0,
    id: 0,
    name: 'none',
    dialogs: [],
    currentDialog: -1
}

//dialog item = {id: int, last_message: str, other_members: list of names, unread_count: int}

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'setUser': 
            return {...state, id: action.payload.id, name: action.payload.name, photoURL: action.payload?.photoURL, dialogs: action.payload.dialogs ? action.payload.dialogs : []}
        case 'setUserId':
            return {...state, id: action.payload}
        case 'setUserName': 
            return {...state, name: action.payload}
        case 'setUserDialogs': 
            return {...state, dialogs: action.payload}
        case 'setCurrentDialog':
            return {...state, currentDialog: action.payload}
        default: return state
    }
}