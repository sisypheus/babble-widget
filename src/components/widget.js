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
			<div className='fixed bottom-0 right-0 sm:p-6 sm:mb-[4rem]'>
				<div onClick={() => (console.log('click'))} className={`transition-all w-screen h-screen duration-200 ease-in bg-gray-200 sm:h-[30rem] sm:w-[18rem] rounded-md ${widgetOpen ? 'opacity-100 sm:-translate-y-10' : 'transition-none absolute invisible opacity-0 '}`}>
					<div>top</div>
					<div className='relative'>
						<div className='fixed bottom-0'>bottom</div>
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
