import { h } from 'preact';
import { Message as MessageModel } from '../models';

type Props = {
  message: MessageModel,
  messages: MessageModel[],
  index: number,
}

const Message = ({ message, messages, index }: Props) => {
  const nextMessage = index == 0 ? undefined : messages.at(index - 1);

  const formatDate = (date: string) => {
    const formatted = new Date(date);
    const diff = Math.abs(Date.now() - formatted.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / 1000) / 60);
    if (days > 0)
      return `${days > 1 ? days + " days" : days + " day"} ago`;
    else if (hours > 0)
      return `${days > 1 ? hours + " hours" : hours + " hour"} ago`;
    else if (minutes > 0)
      return `${minutes > 1 ? minutes + " minutes" : minutes + " minute"} ago`;
    else
      return "Just now";
  }

  const displayDate = (sender: string, customer: boolean): boolean => {
    if (!nextMessage)
      return true;
    if (nextMessage.sender == sender || (nextMessage.sender === "CUSTOMER" && customer) || ((nextMessage as any).customer && customer))
      return false;
    return true;
  }

  return (
    message?.sender === "CUSTOMER" || (message as any).customer ? (
      <div className='flex flex-col px-4 items-end justify-end'>
        <p className='px-4 py-2 rounded bg-blue-500 text-white'>
          {message.content}
        </p>
        <p>{displayDate(message.sender, true) && formatDate(message.createdAt)}</p>
      </div>
    ) : (
      <div className='flex flex-col px-4 items-start justify-start'>
        <p className='p-2 rounded bg-gray-300'>
          {message.content}
        </p>
        <p>{displayDate(message.sender, false) && formatDate(message.createdAt)}</p>
      </div>
    )
  )
}

export default Message