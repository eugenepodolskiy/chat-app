import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createMessage, createSystemMessage, isValidMessage } from './chat'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const PORT = 3002

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join', (username: string) => {
        socket.data.username = username
        io.emit('message', createSystemMessage(`${username} joined the chat`))
    })

    socket.on('message', (text: string) => {
        if (!isValidMessage(text)) return
        io.emit('message', createMessage(socket.data.username, text))
    })

    socket.on('disconnect', () => {
        if (socket.data.username) {
            io.emit('message', createSystemMessage(`${socket.data.username} left the chat`))
        }
        console.log(`User disconnected: ${socket.id}`)
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})