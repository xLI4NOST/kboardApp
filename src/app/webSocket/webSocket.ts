import {api} from "../../lib/services/api";

let socket: WebSocket | null = null
const listeners: ((message: any) => void)[] = [];

export function initSocket() {
    // console.log('init socket called')

    return new Promise((resolve, reject) => {
        if (socket) {
            return resolve(socket);
        }

        socket = new WebSocket("ws://localhost:5000")

        if(socket){
            socket.onopen = () => {
                resolve(socket)
                const message = {
                    event: 'connection',
                }
                socket!.send(JSON.stringify(message))
            }
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data)
                listeners.forEach(listener => listener(message));
            }
            socket.onclose = () => {
                console.log('socket closed')
            }
            socket.onerror = (err) => {
                console.log(err)
            }
        }
    })

}

export async function sendWebSocketMessage  (event: string, payload?: any) {
    if (!socket) {
        await initSocket()
    }

    if(!socket) return

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