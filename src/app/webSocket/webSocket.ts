import {api} from "../../lib/services/api";

let socket = null
const listeners: ((message: any) => void)[] = [];

export function initSocket(dispatch?) {
    // console.log('init socket called')

    return new Promise((resolve, reject) => {
        if (socket) {
            return resolve(socket);
        }
        socket = new WebSocket("ws://localhost:5000")
        // console.log("socket created", socket);

        socket.onopen = () => {
            // console.log("socket open");
            resolve(socket)
            const message = {
                event: 'connection',
            }
            socket.send(JSON.stringify(message))
        }
        socket.onmessage = (event, payload) => {
            const message = JSON.parse(event.data)
            listeners.forEach(listener => listener(message));
        }
        socket.onclose = () => {
            console.log('socket closed')
        }
        socket.onerror = (err) => {
            console.log(err)
        }
    })

}

export async function sendWebSocketMessage  (event, payload) {
    if (!socket) {
        await initSocket()
    }

    const message = {
        event: event,
        payload: payload
    }

    // console.log(message)

    socket.send(JSON.stringify(message))
}

export function subscribeToWebSocket(callback: (message: any) => void) {
    listeners.push(callback);
    return () => {
        const index = listeners.indexOf(callback);
        if (index !== -1) listeners.splice(index, 1);
    };
}