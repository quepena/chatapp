import React, { useState } from 'react'
import Chat from './Chat'
import MessageScreen from './MessageScreen'
import MessageList from './MessageList'

const ChatScreen = () => {
    const [chat, setChat] = useState([])

    const handleClick = chat => {
        setChat(chat)
    }

    if (JSON.parse(localStorage.getItem('message')) == null)
        localStorage.setItem('message', JSON.stringify(MessageList));

    return (
        <div className='chat-screen'>
            <Chat handleClick={handleClick}/>
            {
                <MessageScreen chat={chat}/>
            }
        </div>

    )
}

export default ChatScreen