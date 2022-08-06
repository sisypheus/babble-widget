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
        <div className="tw-fixed tw-bottom-0 sm:tw-right-0 tw-right-4 sm:tw-p-4 tw-m-auto sm:tw-p-6 tw-pb-16 sm:tw-pb-20">
          <div
            className={`tw-transition-all tw-relative tw-overflow-clip tw-shadow-2xl tw-border-0 tw-border-gray-400 tw-flex-grow tw-flex-shrink tw-basis-0 tw-duration-200 tw-h-[calc(100vh-12rem)] tw-w-[calc(100vw-2rem)] sm:tw-w-[24rem] tw-max-h-[700px] tw-min-h-[300px] tw-ease-in tw-bg-white tw-rounded-lg ${
              widgetOpen
                ? "tw-opacity-100 -tw-translate-y-10"
                : "tw-transition-none tw-absolute tw-invisible tw-opacity-0 "
            }`}
          >
            <div className="tw-flex tw-flex-col tw-flex-shrink tw-basis-0 tw-h-full">
              <div
                style={{ backgroundColor: config.widget.color }}
                className="tw-py-5 tw-px-4 tw-border-0 tw-text-white tw-rounded-t-lg"
              >
                <p className="tw-text-lg">
                  {config.widget.title ?? "Welcome to the company"}
                </p>
              </div>
              <div
                style={{
                  backgroundColor:
                    tinycolor(config.widget.color).lighten().toString() ??
                    "#6ca1f8",
                }}
                className="tw-py-1 tw-text-gray-100"
              >
                <p className="tw-px-4 tw-py-[2px]">
                  {config.widget.subtitle ?? "Chat with us!"}
                </p>
              </div>
              <div
                ref={ref}
                onScroll={trackScrolling}
                className="tw-h-full tw-w-full tw-flex-grow tw-flex-shrink tw-overflow-y-auto tw-flex tw-flex-col-reverse tw-scroll-smooth tw-overscroll-contain"
              >
                <div className="tw-flex tw-flex-col-reverse">
                  {messages.map((message: MessageModel, index: number) => {
                    return (
                      <div key={index} className="tw-py-[2px]">
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
                className="tw-flex tw-p-3 tw-items-center tw-border-y tw-bg-white tw-rounded-b-lg"
                onSubmit={(e) => sendMessage(e)}
              >
                <textarea
                  placeholder="Type your question ✍️..."
                  className="tw-w-full tw-p-2 tw-border-0 tw-outline-none tw-resize-none "
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
      <div className="tw-fixed tw-bottom-0 tw-right-0 tw-p-4 sm:tw-p-6">
        <div
          style={{ backgroundColor: config.widget.color }}
          onClick={handleClick}
          className="tw-p-4 tw-rounded-md tw-cursor-pointer tw-flex tw-align-center"
        >
          <img
            style={{ backgroundColor: config.widget.color }}
            className={`tw-w-8 tw-h-8`}
            src={chat_icon}
            alt="chat"
          />
        </div>
      </div>
    </div>
  );
};

export default Widget;
