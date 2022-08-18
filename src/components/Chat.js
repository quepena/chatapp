import React from 'react'
import ChatsList from './ChatsList'
import { useState } from 'react'
import moment from 'moment'
import * as _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Chat = ({ handleClick }) => {
    const [searchVal, setSearchVal] = useState('')

    const lastDates = []
    var orderedByDates = []
    const sorted = []
    if (JSON.parse(localStorage.getItem('message')) != null) {
        lastDates.push(ChatsList.map(chat => JSON.parse(localStorage.getItem('message')).filter(message => message.chatId == chat.id).slice(-1).pop()))
        orderedByDates = _.orderBy(lastDates[0], 'date').reverse()

        for (let i = 1; i <= ChatsList.length; i++) {
            sorted.push(ChatsList[orderedByDates[i - 1].chatId - 1])
        }
    }

    return (
        <div className='chat-list'>
            <div>
                <img style={{ borderRadius: '50%', height: '60px', width: '60px' }} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'gray', fontSize: '14px', marginTop: '1vh' }} /><input className='search' type="search" onChange={(e) => setSearchVal(e.target.value)} value={searchVal} placeholder='Search'></input>
            </div>
            <div className='chats'>Chats</div>
            <div className='chats-panel'>
                {
                    searchVal == ''
                        ?
                        sorted.map(chat =>
                            <button key={chat.id} onClick={event => handleClick(chat)} className='chat-button'>
                                <div className='chat-wrapper'>
                                    <div className='chat-img-wrapper'>
                                        <img src={chat.photo} />
                                    </div>
                                    <div className='chat-el-wrapper'>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{chat.name}</div>
                                        <div style={{ fontSize: '15px', color: '#878787' }}>{JSON.parse(localStorage.getItem('message')).filter(message => message.chatId == chat.id).slice(-1).pop().message}</div>
                                    </div>
                                    <div className='chat-date' style={{ fontSize: '14px' }}>{moment(JSON.parse(localStorage.getItem('message')).filter(message => message.chatId == chat.id).slice(-1).pop().date).format("MMM D, YYYY")}</div>
                                </div>
                            </button>
                        )
                        :
                        sorted.filter(chat =>
                            chat.name.toLowerCase().includes(searchVal.toLowerCase())).map(chat =>
                                <button key={chat.id} onClick={event => handleClick(chat)} className='chat-button'>
                                    <div className='chat-wrapper'>
                                        <div className='chat-img-wrapper'>
                                            <img src={chat.photo} />
                                        </div>
                                        <div className='chat-el-wrapper'>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{chat.name}</div>
                                            <div style={{ fontSize: '15px' }}>{JSON.parse(localStorage.getItem('message')).filter(message => message.chatId == chat.id).slice(-1).pop().message}</div>
                                        </div>
                                        <div className='chat-date' style={{ fontSize: '14px' }}>{moment(JSON.parse(localStorage.getItem('message')).filter(message => message.chatId == chat.id).slice(-1).pop().date).format("MMM D, YYYY")}</div>
                                    </div>
                                </button>
                            )
                }
            </div>
        </div>
    )
}

export default Chat