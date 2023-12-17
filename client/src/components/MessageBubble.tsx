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
        <div className={`px-3 py-2 rounded-3xl max-w-lg ${isUser ? 'self-end bg-[#0084FF] ml-12' : 'bg-gray-800 mr-12'} w-fit text-sm`}>
            {messageData.message}
        </div>
    )
}

export default MessageBubble;
