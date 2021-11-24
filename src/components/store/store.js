import { createStore, combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { searchReducer } from './searchReducer'
import { userReducer } from "./userReducer";
import { messagesReducer } from "./allMessagesReducer";

// action = {type: '', payload: ''}
// в type - тип изменения, в payload - сами данные, которые нужны чтоб изменить состояние

const rootReducer = combineReducers({
    settings: settingsReducer,
    search: searchReducer,
    user: userReducer,
    messages: messagesReducer
})

export const store = createStore(rootReducer)