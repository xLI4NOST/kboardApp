const ws = require('ws')
const jwt = require('jsonwebtoken');
const {sendMessage} = require("next/dist/client/dev/hot-reloader/pages/websocket");

module.exports = function initWebSocket(server) {
    const wss = new ws.WebSocketServer({server})
    const users = []
    const rooms = new Map()
    const usersMap = new Map()

    wss.on('connection', (ws, req) => {
        const cookie = req.headers.cookie;
        const token = cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        ws.user = user
        user.socket = ws

        ws.on('message', (msg) => {
                let message = JSON.parse(msg)

                switch (message.event) {
                    case "changeOrder":
                    case "connection":
                    case "deleteTask":
                    case "addCard":
                    case 'deleteCard':
                    case "addTask":
                        broadCastMessage(message)
                        break
                    case "joinRoom": {
                        const {slug} = message.payload

                        ws.room = slug


                        if (!rooms.has(slug)) {
                            rooms.set(slug, []);
                        }
                        const roomUsers = rooms.get(slug);


                        if (!roomUsers.some(u => u.id === user.id)) {
                            roomUsers.push(user);
                        }

                        sendUsers('users',slug)
                        break
                    }
                    case 'mouseMove': {
                        const {slug} = message.payload

                        let newMessage = {
                            ...message,
                            userId: user.id,
                            email: user.email,
                        }

                        sendMouseMove(slug, newMessage)
                        break
                    }

                }

            },
            ws.on('close', (msg) => {
                if (!ws.room) return

                const roomUsers = rooms.get(ws.room);
                console.log(roomUsers)
                rooms.set(ws.room, roomUsers.filter(u => u.id !== user.id))

                sendUsers('userOut',ws.room)
            })
        )
    })

    const broadCastMessage = (message) => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
    }

    const sendUsers = (message, slug) => {
        console.log(message)
        const roomUsers = rooms.get(slug)
        roomUsers.forEach(user => {
            user.socket.send(JSON.stringify({
                event: `${message}`,
                payload: roomUsers.map((user) => ({
                    id: user.id,
                    email: user.email,
                    x: 0,
                    y: 0,
                })),
            }))
        })
    }

    const sendMouseMove = (slug, message) => {
        const roomUsers = rooms.get(slug)

        roomUsers.forEach(user => {
            user.socket.send(JSON.stringify(message))
        })
    }
}

const message = {
    event: 'message/connection', array: ''
}
