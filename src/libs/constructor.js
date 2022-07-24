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
    // this.isCurrentDay = (date) => {
    //     const now = new Date()
    //     const formatedDate = new Date(date)
    //     return (now.valueOf() - formatedDate.valueOf() < 24 * 60 * 60 * 1000)
    // }
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

export function isYesterday(date, returnToday) {
    date = new Date(date)	
    let now = new Date()
    if(returnToday) return formatData(now)
    if(date.valueOf() > now.valueOf()) return formatData(date)
    if(Math.abs(date.getFullYear() - now.getFullYear()) === 1){
        if(now.getDate === 1 && now.getMonth() === 0 && date.getDate() === 31 && date.getMonth() === 11) {
            return 'Yesterday'
        } else return formatData(date)
    } else if(Math.abs(date.getFullYear() - now.getFullYear()) > 1) return formatData(date)
    let nowDay = now.getDate()
    let nowMonth = now.getMonth()
    let dateDay = date.getDate()
    let dateMonth = date.getMonth()
    if(Math.abs(nowDay - dateDay) === 1) return 'Yesterday'
    else {
        if([30,29].includes(dateDay - nowDay) && Math.abs(nowMonth - dateMonth) === 1)
            return 'Yesterday'
        else return formatData(date)
    }

    function formatData(date) {
        const Month = 'January, February, March, April, May, June, July, August, September, October, November, December'.split(', ')
        const now = new Date()
        if(date.getFullYear() !== now.getFullYear())
            return [date.getDate(), Month[date.getMonth()], date.getFullYear()].join(' ')
        else return [date.getDate(), Month[date.getMonth()]].join(' ')

    }
}

export function isCurrentDay(date){
    const now = new Date()
    const formatedDate = new Date(date)
    return (now.valueOf() - formatedDate.valueOf() < 24 * 60 * 60 * 1000)
}

// { Message Configuration
//     date: "15:56" (str)                  | время отправления 
//     id: 168 (Number)                     | уникальный id сообщения
//     sender: 4 (Number)                   | id отправителя
//     type: "text" (str)                   | тип сообщения
//     value: "ghkl" (str (text,url))   | само сообщение (картинка или текст)
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