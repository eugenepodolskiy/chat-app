const socket = io()

function join() {
    const username = document.getElementById('username-input').value.trim()
    if (!username) return

    socket.emit('join', username)

    document.getElementById('login').classList.add('hidden')
    document.getElementById('chat').classList.remove('hidden')

    document.getElementById('message-input').focus()
}

function sendMessage() {
    const input = document.getElementById('message-input')
    const text = input.value.trim()
    if (!text) return

    socket.emit('message', text)
    input.value = ''
}

socket.on('message', (msg) => {
    const messages = document.getElementById('messages')

    const div = document.createElement('div')
    div.classList.add('message')

    if (msg.username === 'System') {
        div.classList.add('system')
        div.textContent = msg.text
    } else {
        div.innerHTML = `
            <div class="message-header">${msg.username} · ${msg.time}</div>
            <div>${msg.text}</div>
        `
    }

    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
})

document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage()
})

document.getElementById('username-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') join()
})