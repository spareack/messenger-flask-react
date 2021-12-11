import { createStore, combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { searchReducer } from './searchReducer'
import { userReducer } from "./userReducer";
import { messagesReducer } from "./allMessagesReducer";
import { talksReducer } from "./talksReducer";
import { UIReducer } from "./UIReducer";
import { companionReducer } from "./companionMenuReducer";

// action = {type: '', payload: ''}
// в type - тип изменения, в payload - сами данные, которые нужны чтоб изменить состояние

const rootReducer = combineReducers({
    settings: settingsReducer,
    search: searchReducer,
    user: userReducer,
    messages: messagesReducer,
    talks: talksReducer,
    UI: UIReducer,
    companion: companionReducer
})

export const store = createStore(rootReducer)