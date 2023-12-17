type MessageBubbleProps = {
    messageData: {
        username: string;
        message: string;
    },
    username: string;
}

const MessageBubble = ({ messageData, username }: MessageBubbleProps) => {
    return (
        <div className={`px-3 py-2 rounded-full ${messageData.username === username ? 'bg-blue-500' : 'bg-slate-500'} w-fit text-sm`}>
            {messageData.message}
        </div>
    )
}

export default MessageBubble;
