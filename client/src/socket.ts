import { io } from 'socket.io-client';

const URL = import.meta.env.PROD
    ? 'https://someProductionURL.com'
    : 'http://localhost:4000'

const socket = io(URL, {
    autoConnect: false
});

export { socket };
