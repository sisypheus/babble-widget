import { h } from 'preact';
import '../index.css';
import chat_icon from '../assets/icon_chat.svg';
import { GlobalContext } from '../AppContext';
import { useContext } from 'preact/hooks';

const Widget = () => {
	const { widgetOpen, setWidgetOpen } = useContext(GlobalContext);

	const handleClick = () => {
		setWidgetOpen(!widgetOpen);
	}

	return (
		<div className='reset'>
			<div className='fixed bottom-0 right-0 p-6 mb-[6rem]'>
				{widgetOpen && (
					<div className='bg-gray-200 h-[30rem] w-[18rem] rounded-md'>
					</div>
				)}
				<div className='fixed bottom-0 right-0 p-6'>
					<img onClick={handleClick} className='bg-blue-600 p-4 rounded-md w-8 h-8 cursor-pointer' src={chat_icon} alt='chat' />
				</div>
			</div>
		</div >
	)
}

export default Widget;
