import React from 'react'

const ChatBox = ({ open }) => {
  return (
    <>
      {open &&
        <div>
          <div className="h-64 w-32 bg-teal-300">
          </div>
        </div>
      }
    </>
  )
}

export default ChatBox
