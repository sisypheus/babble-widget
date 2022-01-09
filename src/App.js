import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';

const BabbleEmbed = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);

    // sendMessage({});
    return () => {
      window.removeEventListener("message", receiveMessage);
    }
  }, []);

  const receiveMessage = (event) => {
    console.log(event);
  }

  const sendMessage = (event) => {
    console.log('ici');
    window.top.postMessage({
      type: event.type,
      data: event.data,
      //change this * to the clientId's site
    }, '*');
  }

  const resizeWindow = () => {
    setIsChatOpen(!isChatOpen);
    sendMessage({
      type: 'OPEN_CHAT',
      data: 'oui'
    });
  }

  return (
    <div className="h-screen w-screen">
      <div className="fixed bottom-0 right-0">
        <div className="sticky">
          <div className="flex flex-col items-end justify-center space-y-4">
          <ChatBox open={isChatOpen}></ChatBox>
          <button onClick={resizeWindow} className="bg-sky-400 px-4 py-3 rounded-lg">
            click me
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BabbleEmbed;

