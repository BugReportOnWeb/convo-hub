type MessageBubbleProps = {
    message: string;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
    return (
        <div className='px-3 py-2 rounded-full bg-blue-500 w-fit text-sm'>
            {message}
        </div>
    )
}

export default MessageBubble;
