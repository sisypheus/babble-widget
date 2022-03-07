import { h } from 'preact';
import '../index.css';
import chat_icon from '../assets/icon_chat.svg';
import { GlobalContext } from '../AppContext';
import { useContext, useEffect, useState } from 'preact/hooks';
import socketIOClient, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { ConfigContext } from '../AppContext';

const Widget = () => {
	const { widgetOpen, toggleWidget } = useContext(GlobalContext);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [message, setMessage] = useState('');
	const [customerId, setCustomerId] = useState(localStorage.getItem('BABBLE_CUSTOMER_ID'));
	const config = useContext(ConfigContext);

	console.log(config.widget.mainColor);

	const handleClick = () => {
		toggleWidget(!widgetOpen);
	}

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setMessage(target.value);
	}

	const sendMessage = () => {
		if (message.length > 0) {
			socket?.emit('message', message, customerId);
			setMessage('');
		}
	}

	const receiveMessage = (message: string, test: any) => {
		console.log('receiveMessage', message, test);
	}

	useEffect(() => {
		if (!customerId) {
			const uuid = uuidv4();
			localStorage.setItem('BABBLE_CUSTOMER_ID', uuid);
			setCustomerId(uuid);
			return;
		}
		const socket = socketIOClient('http://localhost:8080', {
			auth: {
				token: customerId,
				clientID: 'prout',
			}
		});
		socket.on('message', receiveMessage);
		setSocket(socket);
	}, [customerId]);

	return (
		<div className='reset'>
			<div className='fixed bottom-0 right-0 sm:p-6 sm:mb-[4rem]'>
				<div className={`transition-all w-screen h-screen duration-200 ease-in bg-gray-200 sm:h-[30rem] sm:w-[18rem] rounded-md ${widgetOpen ? 'opacity-100 sm:-translate-y-10' : 'transition-none absolute invisible opacity-0 '}`}>
					<div>top</div>
					<div className='relative'>
						<div className='fixed bottom-0 w-full flex items-center justify-center'>
							<div className="flex items-center justify-center w-full">
								<input className="w-full" onChange={handleChange} value={message} />
								<button onClick={sendMessage}>send</button>
							</div>
						</div>
					</div>
				</div>
				<div className='fixed bottom-0 right-0 p-6'>
					<img style={{'backgroundColor': config.widget.mainColor}} onClick={handleClick} className={`p-4 rounded-md w-8 h-8 cursor-pointer`} src={chat_icon} alt='chat' />
				</div>
			</div>
		</div >
	)
}

export default Widget;
