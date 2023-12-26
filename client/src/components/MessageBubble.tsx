import { MessageData } from "../types/message";

type MessageBubbleProps = {
    messageData: MessageData;
    messageDataLogs: MessageData[];
    username: string;
}

const MessageBubble = ({ messageData, messageDataLogs, username }: MessageBubbleProps) => {
    const isUser = messageData.username === username;

    const currentMessageIndex = messageDataLogs.indexOf(messageData);
    const previousMessage = messageDataLogs[currentMessageIndex - 1];

    // Username Preview (when NOT to show)
    // - If primary user (isUser)
    // - If NOT primary user then:
    //     - if message username same as previous message username 
    //     - And message type NOT same as previous message type

    // const noUsername = isUser
    //     ? false
    //     : (
    //         messageData.username === previousMessage.username &&
    //         messageData.type === previousMessage.type
    //             ? false
    //             : true
    //     )

    const showUsername = !isUser &&
        !(
            messageData.username === previousMessage.username &&
            messageData.type === previousMessage.type
        );

    return (
        <>
            {messageData.type === 'message-log' && (
                <h1 className='text-xs text-gray-500 self-center mt-1'>
                    {messageData.username === username ? 'You' : messageData.username} {' '}
                    {messageData.message}
                </h1>
            )}

            {messageData.type === 'message-bubble' && (
                <div className={`relative px-3 py-2 rounded-3xl max-w-lg ${showUsername && 'mt-4'} ${isUser ? 'self-end bg-[#0084FF] ml-12' : 'bg-gray-800 mr-12'} w-fit text-sm`}>

                    {showUsername && <h1 className='absolute text-[0.7rem] text-gray-500 bottom-[90%] left-[0.5rem] mb-1'>{messageData.username}</h1>}
                    {messageData.message}
                </div>
            )}
        </>

    )
}

export default MessageBubble;
