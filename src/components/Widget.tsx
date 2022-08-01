import { h } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import tinycolor from "tinycolor2";
import chat_icon from "../assets/icon_chat.svg";
import { ConfigContext, GlobalContext } from "../context/AppContext";
import { useCustomer } from "../context/CustomerContext";
import { useMessages } from "../context/MessagesContext";
import { useSocket } from "../context/SocketContext";
import "../index.css";
import { Message as MessageModel } from "../models";
import Message from "./Message";
import Send from "./Send";

const Widget = () => {
  const { widgetOpen, toggleWidget } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const { customer } = useCustomer();
  const config = useContext(ConfigContext);
  const { socket } = useSocket();
  const ref = useRef<any>(null);
  const { messages, setMessages, isFetchingNextPage, fetchNextPage } =
    useMessages();

  const handleClick = () => {
    toggleWidget(!widgetOpen);
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  };

  const trackScrolling = () => {
    if (!ref.current) return;
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    if (-scrollTop + clientHeight >= scrollHeight - 10 && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const sendMessage = (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (message.length > 0) {
      const fullMessage = {
        content: message,
        file: undefined,
        sender: {
          id: customer!.id,
          name: customer?.name || "Anonymous User",
        },
        customer: true,
        createdAt: Date.now(),
      };
      socket?.emit("message", fullMessage);
      setMessage("");
      setMessages((prev: any[]) => {
        return [fullMessage, ...prev];
      });
    }
  };

  const receiveMessage = (message: any) => {
    setMessages((prev: any[]) => {
      return [message, ...prev];
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("message", receiveMessage);
  }, [socket]);

  return (
    <div>
      <div className="reset">
        <div className="tw-fixed tw-bottom-0 sm:tw-right-0 tw-right-4 sm:tw-p-4 tw-m-auto sm:tw-p-6 mb:tw-[4rem]">
          <div
            className={`tw-transition-all tw-relative tw-overflow-clip tw-shadow-2xl tw-border-0 tw-border-gray-400 tw-flex-grow tw-flex-shrink tw-basis-0 tw-duration-200 tw-h-[calc(100vh-20rem)] sm:tw-h-[calc(100vh-12rem)] tw-w-[calc(100vw-2rem)] sm:tw-w-[24rem] tw-max-h-[700px] tw-min-h-[300px] tw-ease-in tw-bg-white tw-rounded-lg ${
              widgetOpen
                ? "tw-opacity-100 -tw-translate-y-10"
                : "tw-transition-none tw-absolute tw-invisible tw-opacity-0 "
            }`}
          >
            <div className="flex flex-col flex-shrink basis-0 h-full">
              <div
                style={{ backgroundColor: config.widget.color }}
                className="py-5 px-4 border-0 tw-text-white border-b border-gray-400"
              >
                <p className="text-lg">
                  {config.widget.title ?? "Welcome to the company"}
                </p>
              </div>
              <div
                style={{
                  backgroundColor:
                    tinycolor(config.widget.color).lighten().toString() ??
                    "#6ca1f8",
                }}
                className="py-1 text-gray-200"
              >
                <p className="px-4 py-[2px]">
                  {config.widget.subtitle ?? "Chat with us!"}
                </p>
              </div>
              <div
                ref={ref}
                onScroll={trackScrolling}
                className="h-full tw-w-full flex-grow flex-shrink overflow-y-auto flex flex-col-reverse scroll-smooth overscroll-contain"
              >
                <div className="flex flex-col-reverse">
                  {messages.map((message: MessageModel, index: number) => {
                    return (
                      <div key={index} className="py-[2px]">
                        <Message
                          messages={messages}
                          index={index}
                          message={message}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <form
                className="flex p-3 items-center border-y bg-white"
                onSubmit={(e) => sendMessage(e)}
              >
                <textarea
                  placeholder="Type your question ✍️..."
                  className="tw-w-full p-2 border-0 outline-none resize-none"
                  onChange={handleChange}
                  value={message}
                  rows={1}
                />
                <button
                  style={{ backgroundColor: config.widget.color }}
                  className="tw-text-white tw-fill-white tw-p-3 tw-rounded-full"
                >
                  <Send />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-fixed tw-bottom-0 tw-right-0 tw-p-6 sm:tw-p-6">
        <img
          style={{ backgroundColor: config.widget.color }}
          onClick={handleClick}
          className={`tw-p-4 tw-rounded-md tw-w-8 tw-h-8 tw-cursor-pointer`}
          src={chat_icon}
          alt="chat"
        />
      </div>
    </div>
  );
};

export default Widget;
