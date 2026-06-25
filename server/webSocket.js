const ws = require('ws')
const req = require("express/lib/request");

module.exports = function initWebSocket(server) {
    const wss = new ws.WebSocketServer({server})
    wss.on('connection', (ws) => {
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
            }
        })
    })
    const broadCastMessage = (message) => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
    }
}

const message = {
    event: 'message/connection', array: ''
}
