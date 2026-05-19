# Chat App

A real-time chat application built with Node.js, TypeScript, Express and Socket.io.

## Tech Stack

- Node.js + TypeScript
- Express
- Socket.io (WebSocket)
- Jest (unit testing)
- GitHub Actions (CI)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3002

Open multiple browser tabs to simulate multiple users.

## Features

- Real-time messaging via WebSocket
- System notifications when users join or leave
- Message validation (max 500 characters, no empty messages)
- Automatic reconnection handled by Socket.io

## How it works

Unlike REST APIs where the client sends a request and the server responds, WebSocket keeps the connection open. The server can push messages to all connected clients instantly without any request.

```
Client A sends message → Server → broadcasts to all connected clients
```

## Running Tests

```bash
npm test
```

## CI

GitHub Actions runs tests automatically on every push to main.
