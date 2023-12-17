import { FormEvent, useState } from "react";

const App = () => {
    const [message, setMessage] = useState('');
    const [messageLogs, setMessageLogs] = useState<string[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Send message somewhere
        console.log(message);
        setMessageLogs(prevMessageLog => {
            return [...prevMessageLog, message];
        })

        setMessage('');
    }

    return (
        <div className='relative h-screen'>
            <div className='border border-red-500'>
                {messageLogs.map((message, index) => (
                    <div key={index} className=''>
                        {message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className='absolute bottom-0 left-0 right-0 w-full flex gap-3 py-3 px-5'>
                <input
                    className='flex-grow rounded-lg bg-gray-800 text-sm px-3 py-2 color-white outline-none'
                    type='text'
                    autoComplete="false"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className='px-3 py-2 bg-gray-800 rounded-lg text-sm'>Send</button>
            </form>
        </div>
    )
}

export default App;
