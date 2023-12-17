type MessageBubbleProps = {
    messageData: {
        username: string;
        message: string;
    },
    username: string;
}

const MessageBubble = ({ messageData, username }: MessageBubbleProps) => {
    const isUser = messageData.username === username;

    return (
        <div className={`relative px-3 py-2 rounded-3xl max-w-lg ${isUser ? 'self-end bg-[#0084FF] ml-12' : 'bg-gray-800 mr-12 mt-4'} w-fit text-sm`}>
            {/* TODO: Multiple message from same person should not have this */}
            {!isUser && <h1 className='absolute text-[0.7rem] text-gray-500 bottom-[90%] left-[0.5rem] mb-1'>{messageData.username}</h1>}
            {messageData.message}
        </div>
    )
}

export default MessageBubble;
