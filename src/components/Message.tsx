import { h } from "preact";
import { useContext } from "preact/hooks";
import { ConfigContext } from "../context/AppContext";
import { Message as MessageModel } from "../models";

type Props = {
  message: MessageModel;
  messages: MessageModel[];
  index: number;
};

const Message = ({ message, messages, index }: Props) => {
  const nextMessage = index == 0 ? undefined : messages.at(index - 1);
  const config = useContext(ConfigContext);

  const formatDate = (date: string) => {
    const formatted = new Date(date);
    const diff = Math.abs(Date.now() - formatted.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / 1000 / 60);
    if (days > 0) return `${days > 1 ? days + " days" : days + " day"} ago`;
    else if (hours > 0)
      return `${days > 1 ? hours + " hours" : hours + " hour"} ago`;
    else if (minutes > 0)
      return `${minutes > 1 ? minutes + " minutes" : minutes + " minute"} ago`;
    else return "Just now";
  };

  const displayDate = (sender: string, customer: boolean): boolean => {
    if (!nextMessage) return true;
    if (
      nextMessage.sender == sender ||
      (nextMessage.sender === "CUSTOMER" && customer) ||
      ((nextMessage as any).customer && customer)
    )
      return false;
    return true;
  };

  return message?.sender === "CUSTOMER" || (message as any).customer ? (
    <div className="tw-flex tw-flex-col tw-px-4 tw-items-end tw-justify-end">
      <p
        style={{ backgroundColor: config.widget.color }}
        className="tw-p-2 tw-rounded tw-text-white tw-whitespace-pre-line"
      >
        {message.content}
      </p>
      <p>
        {displayDate(message.sender, true) && formatDate(message.createdAt)}
      </p>
    </div>
  ) : (
    <div className="tw-flex tw-flex-col tw-px-4 tw-items-start tw-justify-start">
      <p className="tw-p-2 tw-rounded tw-bg-gray-300 tw-whitespace-pre-line">
        {message.content}
      </p>
      <p>
        {displayDate(message.sender, false) && formatDate(message.createdAt)}
      </p>
    </div>
  );
};

export default Message;
