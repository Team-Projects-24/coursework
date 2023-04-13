
interface MessageBubbleProps{
    text:string;
    person:string;
    recOrSen:boolean;
}
const MessageBubble: React.FC<MessageBubbleProps> = ({text,person,recOrSen}) =>{
    const currentTime = new Date().toLocaleTimeString();
    return(
        <div>
         <div className={`speech-bubble ${recOrSen ? 'sent' : 'received'}`}>
            <p>{text}</p>
            <span className="time">{currentTime}</span>
        </div>
        </div>

    )

    
}
export default MessageBubble;