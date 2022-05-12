import { h } from 'preact';
import { Message as MessageModel } from '../models';

type Props = {
  message: MessageModel
}

const Message = ({ message }: Props) => {
  return (
    message?.sender === "CUSTOMER" || (message as any).customer ? (
      <div className='flex items-end justify-end'>
        <p className='p-4 m-1 mx-2 rounded bg-blue-500 text-white'>
          {message.content}
        </p>
      </div>
    ) : (
      <div className='flex m-1 mx-2 items-start justify-start'>
        <p className='p-2 rounded bg-gray-300'>
          {message.content}
        </p>
      </div>
    )
  )
}

export default Message