import { h } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import chat_icon from '../assets/icon_chat.svg';
import { ConfigContext, GlobalContext } from '../context/AppContext';
import { useCustomer } from '../context/CustomerContext';
import { useMessages } from '../context/MessagesContext';
import { useSocket } from '../context/SocketContext';
import '../index.css';
import { Message as MessageModel } from '../models';
import Message from './Message';
import Send from './Send';

const Widget = () => {
	const { widgetOpen, toggleWidget } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const { customer } = useCustomer()
	const config = useContext(ConfigContext);
	const { socket } = useSocket();
	const ref = useRef<any>(null);
	const { messages, setMessages, isFetchingNextPage, fetchNextPage } = useMessages();

	const handleClick = () => {
		toggleWidget(!widgetOpen);
	}

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setMessage(target.value);
	}

	const trackScrolling = () => {
		if (!ref.current)
			return;
		const { scrollTop, scrollHeight, clientHeight } = ref.current;

		if (-scrollTop + clientHeight >= scrollHeight - 10 && !isFetchingNextPage) {
			fetchNextPage();
		}
	}

	const sendMessage = (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
		e.preventDefault();
		if (message.length > 0) {
			const fullMessage = {
				content: message,
				file: undefined,
				sender: {
					id: customer!.id,
					name: customer?.name || 'Anonymous User',
				},
				customer: true,
				createdAt: Date.now(),
			}
			socket?.emit('message', fullMessage);
			setMessage('');
			setMessages((prev: any[]) => {
				return [fullMessage, ...prev]
			});
		}
	}

	const receiveMessage = (message: any) => {
		setMessages((prev: any[]) => {
			return [message, ...prev];
		});
	}

	useEffect(() => {
		if (!socket)
			return;
		socket.on('message', receiveMessage);
	}, [socket]);

	return (
		<div>
			<div className='reset'>
				<div className='fixed bottom-0 sm:right-0 right-4 sm-p-4 m-auto sm:p-6 mb-[4rem]'>
					<div className={`transition-all relative overflow-clip shadow-2xl border border-gray-400 flex-grow flex-shrink basis-0 duration-200 h-[calc(100vh-20rem)] sm:h-[calc(100vh-12rem)] w-[calc(100vw-2rem)] sm:w-[24rem] max-h-[700px] min-h-[300px] ease-in bg-white rounded-md ${widgetOpen ? 'opacity-100 -translate-y-10' : 'transition-none absolute invisible opacity-0 '}`}>
						<div className='flex flex-col flex-shrink basis-0 h-full'>
							<div className='py-6 border-b border-gray-400'>
								Chat
							</div>
							<div ref={ref} onScroll={trackScrolling} className='h-full w-full flex-grow flex-shrink overflow-y-auto flex flex-col-reverse scroll-smooth overscroll-contain'>
								<div className='flex flex-col-reverse'>
									{messages.map((message: MessageModel, index: number) => {
										return (
											<div key={index} className="py-[2px]">
												<Message messages={messages} index={index} message={message} />
											</div>
										)
									})}
								</div>
							</div>
							<form className='flex p-3 items-center border bg-white' onSubmit={(e) => sendMessage(e)}>
								<input placeholder='Posez votre question' className='w-full p-2 border-0 outline-none' onChange={handleChange} value={message} />
								<button className='text-white fill-white p-3 bg-blue-500 rounded-full'>
									<Send />
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='fixed bottom-0 right-0 p-6 sm:p-6'>
				<img style={{ 'backgroundColor': config.widget.mainColor }} onClick={handleClick} className={`p-4 rounded-md w-8 h-8 cursor-pointer`} src={chat_icon} alt='chat' />
			</div>
		</div>
	)
}

export default Widget;
