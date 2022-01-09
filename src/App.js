import React, { useEffect } from 'react'


const BabbleEmbed = () => {
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
    sendMessage({
      type: 'OPEN_CHAT',
      data: 'oui'
    });
  }

  return (
    <div className="h-screen w-screen">
      <div className="absolute bottom-0 right-0">
        <div>
          <button onClick={resizeWindow} className="bg-sky-400 px-4 py-3 rounded-lg">
            click me
          </button>
        </div>
      </div>
    </div>
  )
}

export default BabbleEmbed;

