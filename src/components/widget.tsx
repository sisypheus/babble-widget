import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import chat_icon from '../assets/icon_chat.svg';
import { ConfigContext, GlobalContext } from '../context/AppContext';
import { MessagesContext } from '../context/MessagesContext';
import { useCustomer } from '../context/CustomerContext';
import '../index.css';
import { useSocket } from '../context/SocketContext';

const Widget = () => {
	const { widgetOpen, toggleWidget } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const { customer } = useCustomer()
	const config = useContext(ConfigContext);
	const { messages } = useContext(MessagesContext);
	const { socket } = useSocket();

	const handleClick = () => {
		toggleWidget(!widgetOpen);
	}

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setMessage(target.value);
	}

	const sendMessage = () => {
		if (message.length > 0) {
			const fullMessage = {
				content: message,
				file: undefined,
				sender: {
					id: customer!.id,
					name: customer?.name || 'Anonymous User',
				}
			}
			console.log(socket);
			socket?.emit('message', fullMessage);
			setMessage('');
		}
	}

	const receiveMessage = (message: any) => {
		console.log('receiveMessage', message);
	}

	return (
		<div className='reset'>
			<div className='fixed bottom-0 right-0 sm:p-6 sm:mb-[4rem]'>
				<div className={`transition-all w-screen h-screen duration-200 ease-in bg-gray-50 sm:h-[30rem] sm:w-[18rem] rounded-md ${widgetOpen ? 'opacity-100 sm:-translate-y-10' : 'transition-none absolute invisible opacity-0 '}`}>
					<div></div>
					<div className='relative'>
						<div>
							{messages.map(message => {
								return <div>{message.content!}</div>
							})}
						</div>
						<div className='fixed bottom-0 w-full flex items-center justify-center'>
							<div className="flex items-center justify-center w-full">
								<input className="w-full" onChange={handleChange} value={message} />
								<button onClick={sendMessage}>send</button>
							</div>
						</div>
					</div>
				</div>
				<div className='fixed bottom-0 right-0 p-6'>
					<img style={{ 'backgroundColor': config.widget.mainColor }} onClick={handleClick} className={`p-4 rounded-md w-8 h-8 cursor-pointer`} src={chat_icon} alt='chat' />
				</div>
			</div>
		</div >
	)
}

export default Widget;
