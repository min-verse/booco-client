import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Input } from 'react-daisyui';
import FriendChatBubble from './FriendChatBubble';
import UserChatBubble from './UserChatBubble';
import { createConsumer } from '@rails/actioncable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function ChatModal({ open, toggle, friend }) {
    const bottomRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user);
    const friend1 = Math.min(user['profile']['id'], friend['id']);
    const friend2 = Math.max(user['profile']['id'], friend['id']);
    const room = `chat_${friend1} ${friend2}`;
    

    console.log(room);

    useEffect(() => {

        // // if I want to authenticate connection with JWT
        // const token = localStorage.getItem("token");
        // const url = `ws://localhost:5000/cable?token=${token}`
        // const cable = createConsumer(url);

        // 1. create the connection to the backend
        // this will give us access to an actioncable connection by passing in the URL for our backend
        // instead of the http protocol, we'll use the ws protocol or the websocket protocol
        // since we mounted the actioncable on the 'cable' route, we'll need to reference that here
        const cable = createConsumer(`ws://localhost:5000/cable`);

        const params = {
            channel: "ChatsChannel",
            // we can also send extra params such as user_id or friend_id when we create this subscription

            // we'll also need to add this state to the dependency array if we put it as a param in our subscription
            room: room
        };

        // 3. [READ 2 FIRST, I put this here because we have to DEFINE HANDLERS *before* we create the subscriptions] figure out how to add a new message from that channel when a new message comes in
        // now that the above code establishes a subscription, we will then have to make handler(s) to HANDLE what happens whenever
        // we get a subscription (i.e. whenever we get new udpated chat messages)
        // this *handlers* is a series of CALLBACK FUNCTIONS that will run whenever a 
        // NEW MESSAGES comes in for this subscription

        // think of "handlers" as the .then() for our response from the socket
        const handlers = {
            received(receivedMessage) {
                console.log(receivedMessage);
                console.log("before state setter", messages);
                // after receiving NEW DATA (which is going to be, abstractly, new messages in the chat),
                // we'll want to UPDATE the STATE of messages so this is what this line below is doing
                // setMessages({...messages, 
                //     newMessages:[...messages['newMessages'], receivedMessage]
                // })
                setMessages((prevMessages) => {
                    return [...prevMessages, receivedMessage]
                });
                console.log("before state setter", messages);
                setNewMessage('');
                
            },
            connected(data) {
                console.log(data);
                console.log(`cable is connected to ${room}`);
            },
            disconnected() {
                console.log(`disconnected cable from ${room}`)
            }
        };

        // 2. subscribe to the specific channel that i want to subscribe to (use token id? use redux slice and friend id)
        // once we have created the cable (in the previous step) we can now subscribe to *specific channels*
        // the channel name should match the channel name that we have created in the backend (I made a chat channel with specific streams)

        // this is like making request to the backend (subscription)
        // cable.subscriptions.create(
        // //     {
        // //     channel: "ChatsChannel",
        // //     // we can also send extra params such as user_id or friend_id when we create this subscription

        // //     // we'll also need to add this state to the dependency array if we put it as a param in our subscription
        // //     room: room
        // // }
        // params,
        //     handlers
        // );


        // 3. figure out how to add a new message from that channel when a new message comes in

        // 3+4.
        const subscription = cable.subscriptions.create(params, handlers);
        // 4. unsubscribe from the channel when my component is done with it/is unmounted
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
                console.log(data);
                setMessages(data);
            })
    }, []);

    const handleAddMessage = async (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        let token = localStorage.getItem("token");

        /* this route is a regular custom http route that will go to some controller that you will define for handling chat messages 
        for this example, i'm just going to define a controller called BookChatsController and its route
        will be something like: "post '/bookchat', to: 'bookchats#create'" or something like that*/

        /* the version of this fetch request commented out below includes the state change but we commented that part out
        under the assumption that the state change will happen in the received() handler so that we avoid updating state
        TWICE for every new message submission */
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
                    {/* <div className="chat-friend-bubble">
                        <p style={{ fontSize: 12, fontStyle: 'italic' }}>{friend['username']}</p>
                        <div className="chat-text-style">
                            asdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsa
                        </div>
                    </div>

                    <div className="chat-user-bubble">
                        <p style={{ fontSize: 12, fontStyle: 'italic' }}>{user['profile']['username']}</p>
                        <div className="chat-text-style">
                            asdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsaasdsa
                        </div>
                    </div> */}
                    <div ref={bottomRef} />
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