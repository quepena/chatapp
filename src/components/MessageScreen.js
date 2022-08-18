import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import ChatsList from './ChatsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const MessageScreen = (props) => {
  const chat = props.chat
  const [messages, setMessages] = useState([]);
  const [norris, setNorris] = useState('');
  const [notif, setNotif] = useState('');
  const [read, setRead] = useState('');
  const scrollRef = useRef(null);

  var messagesFromStore = useState([])

  if (localStorage.getItem('message')) {
    if (JSON.parse(localStorage.getItem('message')).length > 1) {
      messagesFromStore = JSON.parse(localStorage.getItem('message'));
    }
  }

  useEffect(() => {
    setMessages([...messagesFromStore])
    if (scrollRef && scrollRef.current)
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      })

    if (notif && notif.senderId == chat.id)
      setRead('read')
  }, [chat, scrollRef, notif])

  const [newMessage, setNewMessage] = useState('');

  const fetchJoke = async () => {
    const { data } = await axios.get('https://api.chucknorris.io/jokes/random');

    const message = {
      chatId: chat.id,
      message: data.value,
      date: Date.now(),
      senderId: chat.id,
    }

    let messagesList = [];
    if (localStorage.getItem('message')) {
      messagesList = JSON.parse(localStorage.getItem('message'));
    }
    messagesList.push(message);
    localStorage.setItem('message', JSON.stringify(messagesList));

    setMessages([...messagesFromStore, message])
    setNorris(message)
    setNotif(message)
    setRead('')
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const message = {
      chatId: chat.id,
      message: newMessage,
      date: Date.now(),
      senderId: 'user',
    }

    let messagesList = [];
    if (localStorage.getItem('message')) {
      messagesList = JSON.parse(localStorage.getItem('message'));
    }
    messagesList.push(message);
    localStorage.setItem('message', JSON.stringify(messagesList));

    messagesFromStore = JSON.parse(localStorage.getItem('message'));

    setMessages([...messages, message])
    setNewMessage('')
    setNorris(null)

    setTimeout(fetchJoke, 10000)
  }

  return (
    <div className='message-area' ref={scrollRef}>
      <div className='message-screen'>
        <div className='conv'>
          <div className='chat-name-wrapper'>
            <div className='img-wrapper-header'>
              <img src={chat.photo}></img>
            </div>
            <div className='chat-name'>{chat.name}</div>
          </div>
        </div>
        <div>
          {
            chat != ''
              ?
              <div>
                <div>
                  {
                    messages.map(message => chat.id === message.chatId
                      ?
                      message.senderId !== 'user'
                        ?
                        <div className='message-wrapper'>
                          <div className='img-wrapper'>
                            <img src={chat.photo}></img>
                          </div>
                          <div>
                            <div className={message.senderId === 'user' ? "own-message" : "convo-message"}>{message.message}</div>
                            <div className={message.senderId === 'user' ? "date-own-message" : "date-convo-message"}>{moment(message.date).format("MM/D/YY, LT")}</div>
                          </div>
                        </div>
                        :
                        <div>
                          <div className={message.senderId === 'user' ? "own-message" : "convo-message"}>{message.message}</div>
                          <div className={message.senderId === 'user' ? "date-own-message" : "date-convo-message"}>{moment(message.date).format("MM/D/YY, LT")}</div>
                        </div>
                      :
                      <></>
                    )
                  }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <input className='message-input' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder='Type your message'></input>
                  <button className='submit-button' onClick={submitHandler} type="submit" ><FontAwesomeIcon icon={faPaperPlane} style={{ color: 'gray', fontSize: '30px' }} /></button>
                </div>
              </div>
              :
              <div>Choose a chat to start a conversation!</div>
          }
        </div>
      </div>
      <div className='notification'>
        {
          norris
            ?
            norris && read != 'read'
              ?
              <div className='notification-new'>New Message From {`${ChatsList.filter(chat => chat.id == notif.senderId)[0].name}`}</div>
              :
              <></>
            :
            <></>
        }
      </div>
    </div>
  )
}

export default MessageScreen