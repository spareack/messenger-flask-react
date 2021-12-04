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

export function Message(id, sender, value, date, center=false) {
    if (!new.target) {
        return new Message(id, sender, value, date, center=false); 
    }
    this.sender = sender
    this.value = value
    this.date = date 
    this.id = id
    this.center = center
    this.type = 'text'
}

export function Talk(id, title, messages) {
    if (!new.target) {
        return new Talk(id, title, messages); 
    }
    this.id = id
    this.title = title
    this.messages = messages
    // { id: res.data.id, title: name, messages: [] }
}