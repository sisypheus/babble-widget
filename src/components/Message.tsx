import { h } from 'preact';
import { Message as MessageModel } from '../models';

type Props = {
  message: MessageModel
}

const Message = ({ message }: Props) => {
  return (
    console.log(message),
    message?.sender === "CUSTOMER" || (message as any).customer ? (
      <div className='p-2 flex items-end justify-end'>{message.content}</div>
    ) : (
      <div className='p-2 flex items-start justify-start'>{message.content}</div>
    )
  )
}

export default Message