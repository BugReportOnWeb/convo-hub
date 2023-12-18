type MessageBubbleProps = {
    messageData: {
        type: 'message-bubble' | 'message-log';
        username: string;
        message: string;
    },
    username: string;
}

const MessageBubble = ({ messageData, username }: MessageBubbleProps) => {
    const isUser = messageData.username === username;

    return (
        <>
            {messageData.type === 'message-log' && (
                <h1 className='text-xs text-gray-500 self-center mt-1'>
                    {messageData.username === username ? 'You' : messageData.username} {' '}
                    {messageData.message}
                </h1>
            )}

            {messageData.type === 'message-bubble' && (
                <div className={`relative px-3 py-2 rounded-3xl max-w-lg ${isUser ? 'self-end bg-[#0084FF] ml-12' : 'bg-gray-800 mr-12 mt-4'} w-fit text-sm`}>
                    {/* TODO: Multiple message from same person should not have this */}
                    {!isUser && <h1 className='absolute text-[0.7rem] text-gray-500 bottom-[90%] left-[0.5rem] mb-1'>{messageData.username}</h1>}
                    {messageData.message}
                </div>
            )}
        </>

    )
}

export default MessageBubble;
