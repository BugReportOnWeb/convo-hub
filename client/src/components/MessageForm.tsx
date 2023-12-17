import { Dispatch, FormEvent, SetStateAction } from "react";

type MessageFormProps = {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    handleMessageSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const MessageForm = ({ message, setMessage, handleMessageSubmit }: MessageFormProps) => {
    return (
            <form onSubmit={handleMessageSubmit} className='absolute bottom-0 left-0 right-0 w-full flex gap-3 p-3 bg-[#1a1a1a]'>
                <input
                    className='flex-grow rounded-lg bg-gray-800 text-sm px-3 py-2 color-white outline-none'
                    type='text'
                    autoComplete="false"
                    placeholder="Message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className='px-3 py-2 bg-gray-800 rounded-lg text-sm transition-colors hover:bg-gray-700'>Send</button>
            </form>
    )
}

export default MessageForm;
