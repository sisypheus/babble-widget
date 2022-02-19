import { h } from 'preact';
import '../index.css';
import chat_icon from '../assets/icon_chat.svg';
import { GlobalContext } from '../AppContext';
import { useContext, useEffect, useState } from 'preact/hooks';
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const Widget = () => {
	const { widgetOpen, setWidgetOpen } = useContext(GlobalContext);
	const [socket, setSocket] = useState(null);
	const [message, setMessage] = useState('');
	const [customerId, setCustomerId] = useState(localStorage.getItem('BABBLE_CUSTOMER_ID'));

	const handleClick = () => {
		setWidgetOpen(!widgetOpen);
	}

	const handleChange = (e) => {
		setMessage(e.target.value);
	}

	const sendMessage = () => {
		if (message.length > 0) {
			if (!customerId || customerId.length === 0) {
				const newCustomerId = uuidv4();
				setCustomerId(newCustomerId);
				localStorage.setItem('BABBLE_CUSTOMER_ID', newCustomerId);
			}
			socket.emit('message', message);
			setMessage('');
		}
	}

	useEffect(() => {
		const socket = socketIOClient('http://localhost:8080');
		setSocket(socket);
	}, [])

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
					<img onClick={handleClick} className='bg-blue-600 p-4 rounded-md w-8 h-8 cursor-pointer' src={chat_icon} alt='chat' />
				</div>
			</div>
		</div >
	)
}

export default Widget;
