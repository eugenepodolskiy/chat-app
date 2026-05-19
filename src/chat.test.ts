import { createMessage, createSystemMessage, isValidMessage } from './chat'

describe('createMessage', () => {

    it('should create a message with correct fields', () => {
        const msg = createMessage('Max', 'Hello')
        expect(msg.username).toBe('Max')
        expect(msg.text).toBe('Hello')
        expect(msg.time).toBeDefined()
    })
})

describe('createSystemMessage', () => {

    it('should create a system message', () => {
        const msg = createSystemMessage('User joined')
        expect(msg.username).toBe('System')
        expect(msg.text).toBe('User joined')
    })
})

describe('isValidMessage', () => {

    it('should return true for valid message', () => {
        expect(isValidMessage('Hello')).toBe(true)
    })

    it('should return false for empty message', () => {
        expect(isValidMessage('')).toBe(false)
    })

    it('should return false for whitespace only', () => {
        expect(isValidMessage('   ')).toBe(false)
    })

    it('should return false for message over 500 characters', () => {
        expect(isValidMessage('a'.repeat(501))).toBe(false)
    })

    it('should return true for message exactly 500 characters', () => {
        expect(isValidMessage('a'.repeat(500))).toBe(true)
    })
})