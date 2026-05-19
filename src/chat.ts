export interface Message {
    username: string
    text: string
    time: string
}

export function createMessage(username: string, text: string): Message {
    return {
        username,
        text,
        time: new Date().toLocaleTimeString()
    }
}

export function createSystemMessage(text: string): Message {
    return createMessage('System', text)
}

export function isValidMessage(text: string): boolean {
    return text.trim().length > 0 && text.trim().length <= 500
}