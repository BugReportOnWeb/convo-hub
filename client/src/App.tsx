import { FormEvent, useEffect, useState } from "react";
import MessageBubble from "./components/MessageBubble";
import MessageForm from "./components/MessageForm";
import { socket } from "./socket";

type MessageData = {
    username: string;
    message: string;
}

const App = () => {
    // Form fields data
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const [formError, setFormError] = useState<string | null>(null);
    const [messageDataLogs, setMessageDataLogs] = useState<MessageData[] | null>(null);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true)
        }

        const onDisconnect = () => {
            setIsConnected(false)
        }

        const onChatMessage = (messageData: MessageData) => {
            setMessageDataLogs(prevLogs => {
                return prevLogs
                    ? [...prevLogs, messageData]
                    : [messageData]
            })
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chatMessage', onChatMessage);

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chatMessage');
        }
    }, []);

    const handleUsernameSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username === "") {
            setFormError("Username can't be empty");
            return;
        }

        socket.connect();
    }

    const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const messageData: MessageData = {
            username,
            message
        }

        socket.emit('chatMessage', messageData);

        setMessage('');
    }

    return (
        <div className='relative h-screen'>
            {!isConnected && (
                <form onSubmit={handleUsernameSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800 text-sm px-3 py-2 color-white outline-none"
                    />

                    {formError && (
                        <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-full text-sm text-red-500/80 mt-2'>{formError}</h1>
                    )}
                </form>
            )}

            {/* FIX: Proper scroll on message */}
            {isConnected && (
                <>
                    <div className='p-5 flex flex-col gap-3'>
                        {messageDataLogs && messageDataLogs.map((messageData, index) => (
                            <MessageBubble key={index} messageData={messageData} username={username} />
                        ))}
                    </div>

                    <MessageForm
                        message={message}
                        setMessage={setMessage}
                        handleMessageSubmit={handleMessageSubmit}
                    />
                </>
            )}
        </div>
    )
}

export default App;
