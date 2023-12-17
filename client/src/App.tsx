import { FormEvent, useState } from "react";
import MessageBubble from "./components/MessageBubble";
import MessageForm from "./components/MessageForm";

const App = () => {
    const [message, setMessage] = useState('');
    const [messageLogs, setMessageLogs] = useState<string[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: BrodcastMessage to all clients
        console.log(message);
        setMessageLogs(prevMessageLog => {
            return [...prevMessageLog, message];
        })

        setMessage('');
    }

    return (
        <div className='relative h-screen'>
            {/* FIX: Proper scroll on message */}
            <div className='p-5 flex flex-col gap-3'>
                {messageLogs.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                ))}
            </div>

            <MessageForm
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default App;
