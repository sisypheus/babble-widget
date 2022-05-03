import { h } from 'preact';
import { useContext, useRef, useState } from 'preact/hooks';
import chat_icon from '../assets/icon_chat.svg';
import { ConfigContext, GlobalContext } from '../context/AppContext';
import { useCustomer } from '../context/CustomerContext';
import { useMessages } from '../context/MessagesContext';
import { useSocket } from '../context/SocketContext';
import '../index.css';
import { Message as MessageModel } from '../models';
import Message from './Message';

const Widget = () => {
	const { widgetOpen, toggleWidget } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const { customer } = useCustomer()
	const config = useContext(ConfigContext);
	const { data } = useMessages();
	const { socket } = useSocket();
	const ref = useRef<any>(null);
	const { messages, isFetchingNextPage, fetchNextPage } = useMessages();

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
			console.log('fetching next page');
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
				}
			}
			socket?.emit('message', fullMessage);
			setMessage('');
		}
	}

	const receiveMessage = (message: any) => {
		console.log('receiveMessage', message);
	}

	return (
		<div>
			<div className='reset'>
				<div className='fixed bottom-0 right-0 sm:p-6 sm:mb-[4rem]'>
					<div className={`transition-all w-screen border border-gray-400 h-screen duration-200 pb-12 overflow-clip ease-in bg-gray-200 sm:h-[28rem] sm:w-[18rem] rounded-md ${widgetOpen ? 'opacity-100 sm:-translate-y-10' : 'transition-none absolute invisible opacity-0 '}`}>
						<div>
							Chat
						</div>
						<div ref={ref} onScroll={trackScrolling} className='h-full w-full overflow-y-auto flex flex-col-reverse scroll-smooth'>
							<div className='flex flex-col-reverse'>
								{messages.map((message: MessageModel) => {
									return <Message message={message} />
								})}
							</div>
						</div>
						<div className='w-full relative'>
							<div className='fixed bottom-0 w-full'>
								<form className='flex w-full items-center' onSubmit={(e) => sendMessage(e)}>
									<input className='w-full p-2 border-0 outline-none' onChange={handleChange} value={message} />
									<button>send</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='fixed bottom-0 right-0 p-6'>
				<img style={{ 'backgroundColor': config.widget.mainColor }} onClick={handleClick} className={`p-4 rounded-md w-8 h-8 cursor-pointer`} src={chat_icon} alt='chat' />
			</div>
		</div>
	)
}

export default Widget;
