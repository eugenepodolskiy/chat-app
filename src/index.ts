import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const PORT = 3002

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join', (username: string) => {
        socket.data.username = username
        io.emit('message', {
            username: 'System',
            text: `${username} joined the chat`,
            time: new Date().toLocaleTimeString()
        })
    })

    socket.on('message', (text: string) => {
        io.emit('message', {
            username: socket.data.username,
            text,
            time: new Date().toLocaleTimeString()
        })
    })

    socket.on('disconnect', () => {
        if (socket.data.username) {
            io.emit('message', {
                username: 'System',
                text: `${socket.data.username} left the chat`,
                time: new Date().toLocaleTimeString()
            })
        }
        console.log(`User disconnected: ${socket.id}`)
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})