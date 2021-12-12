export function Dialog(id, lastMessage, otherMembers) {
    if (!new.target) {
        return new Dialog(id, lastMessage, otherMembers); 
    }
    this.id = id
    this.last_message = lastMessage
    this.other_members = otherMembers
}

export function Member(avatarID, name, userStatus) {
    if (!new.target) {
        return new Member(avatarID, name, userStatus); 
    }
    this.avatar_id = avatarID
    this.name = name
    this.user_status = userStatus
}

export function Message(id, sender, value, date, type='text') {
    if (!new.target) {
        return new Message(id, sender, value, date, type); 
    }
    this.sender = sender
    this.value = value
    this.date = date 
    this.id = id
    this.center = false
    this.type = type
}

export function Talk(id, title, date) {
    if (!new.target) {
        return new Talk(id, title, date); 
    }
    this.id = id
    this.title = title
    this.date = date
}

export function Separator(value) {
    if (!new.target) {
        return new Separator(value); 
    }
    this.sender = null
    this.center = true
    this.value = value
    this.date = ''
    this.type = 'text'
    this.id = Math.random()* 10000
}

// { Message Configuration
//     date: "15:56" (str)                  | время отправления 
//     id: 168 (Number)                     | уникальный id сообщения
//     sender: 4 (Number)                   | id отправителя
//     type: "text" (str)                   | тип сообщения
//     value: "ghkl" (str (text,int,url))   | само сообщение (картинка или текст)
//     center: 1 (bool)                     | Сепаратор это или нет
// }

// { Talk Configuration
//     date: "2021-11-11 16:24:27.241678" (date,str)    | дата создания разговора
//     id: 2 (number)                                   | уникальный id разговора
//     title: "dota3" (str)                             | Название разговора
// }

// { Dialog Configuration 
//     id: 1 (Number)                                   | уникальный id диалога
//     last_message: "ghkl" (str or null)               | последнее сообщение в диалоге
//     other_members: [{…}] (array of Member Objects)   | массив участников диалога
//     unread_count: 0 (Number)                         | количество непрочитанных сообщений
// }

// { Member Configuration
//     avatar_id: null (Number or null)                     | id аватара участника диалога (/get_file?file_id=${id})
//     date_visit: "2021-12-03 01:52:24.622846" (date, str) | время последнего посещения
//     name: "dumka" (str)                                  | имя участника диалога
//     user_status: 1 (bool)                                | его статус (в сети или нет)
// }