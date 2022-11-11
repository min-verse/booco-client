import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-daisyui';
import FriendChatBubble from './FriendChatBubble';
import UserChatBubble from './UserChatBubble';
import { createConsumer } from '@rails/actioncable';
import { useSelector } from 'react-redux';

function ChatModal({ open, toggle, friend }) {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user);
    const friend1 = Math.min(user['profile']['id'], friend['id']);
    const friend2 = Math.max(user['profile']['id'], friend['id']);
    const room = `chat_${friend1} ${friend2}`;
    const chatBoxDisplay = document.getElementById('chat-box-display');

    const autoScroll = ()=>{
        chatBoxDisplay.scrollTop = chatBoxDisplay.scrollHeight;
    }

    useEffect(() => {

        const cable = createConsumer(`ws://localhost:5000/cable`);

        const params = {
            channel: "ChatsChannel",
            room: room
        };

        const handlers = {
            received(receivedMessage) {
                setMessages((prevMessages) => {
                    return [...prevMessages, receivedMessage]
                });
                setNewMessage('');
                autoScroll();
            },
            connected(data) {
                console.log(`cable is connected to ${room}`);
            },
            disconnected() {
                console.log(`disconnected cable from ${room}`)
            }
        };

        const subscription = cable.subscriptions.create(params, handlers);
        return function cleanup() {
            console.log(`clean-up function: unsubscribing from this chat ${room}`);
            subscription.unsubscribe();
        };
    }, [user['profile']['id']]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        fetch(`http://localhost:5000/all_bookchats/${friend['id']}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        }).then(res => res.json())
            .then((data) => {
                setMessages(data);
            })
    }, []);

    const handleAddMessage = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/bookchats`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                friend: friend['id'],
                message: newMessage,
                room: room
            })
        }).then(res => res.json());
        autoScroll();
    }



    return (
        <>
            <Modal open={open}>
                <div style={{ display: 'flex' }}>
                    <div className="mask mask-squircle w-12 h-12" style={{ marginBottom: 15 }}>
                        <img src={friend['avatar'] ? friend['avatar'] : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                    </div>
                    <h1 style={{ marginLeft: 10, marginTop: 10 }}>{friend['username']}</h1>
                    <Button
                        size="md"
                        shape="circle"
                        className="absolute right-2 top-1"
                        style={{ marginTop: 10, marginRight: 10 }}
                        onClick={toggle}>X</Button>
                </div>
                <div id="chat-box-display" className="chat-bubble-window">
                    {messages && messages.length && messages.length > 0 ?
                        messages.map((item, index) => {
                            if (item['user_id'] === user['profile']['id']) {
                                return (
                                    <UserChatBubble
                                        key={index}
                                        userMessage={item}
                                    />
                                );
                            } else {
                                return (
                                    <FriendChatBubble
                                        key={index}
                                        friendMessage={item}
                                    />
                                );
                            }
                        })
                        :
                        null}
                </div>
                <form onSubmit={handleAddMessage}>
                    <input className="my-4 input input-bordered input-[#cffafe]" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ width: '80%' }} placeholder={`Send message to ${friend['username']}`} />
                    <button type="submit" className="btn" style={{ marginLeft: 10 }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default ChatModal;