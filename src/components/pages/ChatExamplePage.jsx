import React, { useEffect, useState } from 'react';
// this is how we connect to the backend's websocket
import { createConsumer } from '@rails/actioncable';
import { useSelector } from 'react-redux';

function ChatExamplePage({ friend }) {

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState({
        feed: [],
        newMessages: [],
    });

    // const friend1 = Math.max(user['profile']['id'], friend['id'])
    // const friend2 = Math.min(user['profile']['id'], friend['id'])
    const id_1 = 5;
    const id_2 = 1;
    const friend1 = Math.min(id_1, id_2);
    const friend2 = Math.max(id_1, id_2);
    const room = `chat_${friend1} ${friend2}`;
    const user = useSelector((state) => state.user);

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
                console.log("before state setter",messages['newMessages'])
                // after receiving NEW DATA (which is going to be, abstractly, new messages in the chat),
                // we'll want to UPDATE the STATE of messages so this is what this line below is doing
                // setMessages({...messages, 
                //     newMessages:[...messages['newMessages'], receivedMessage]
                // })
                setMessages((prevMessages) => {
                    return (
                        {
                            ...prevMessages,
                            feed: [...prevMessages['feed'], receivedMessage]
                        }
                    );
                });
                console.log(messages);
                console.log("after state setter", messages['newMessages']);
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
        fetch(`http://localhost:5000/all_bookchats`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                friend: 11,
            })
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
                setMessages({
                    feed: data,
                    newMessages: []
                });
            })
    }, []);


    const handleAddMessage = async (e) => {
        e.preventDefault();
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
                friend: 11,
                message: newMessage,
                room: room
            })
        }).then(res => res.json());
        

        // await fetch(`http://localhost:5000/bookchat`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: token,
        //     },
        //     body: JSON.stringify({
        //         message: newMessage
        //     })
        // }).then(res => res.json())
        //     .then((receivedMessage) => {
        //         console.log(receivedMessage);
        //         setMessages((prevMessages) => {
        //             return (
        //                 {
        //                     ...prevMessages,
        //                     newMessages: [receivedMessage, ...prevMessages['newMessages']]
        //                 }
        //             );
        //         });
        //     });
    }

    return (
        <>
            {/* just to mock this up, we'll have this form be the way that users can submit new messages to the channel */}
            <div style={{height:500, overflow:'auto', margin:30, width:300}}>
            {messages['feed'] && messages['feed'].length && messages['feed'].length > 0 ?
                messages['feed'].map((item, index) => {
                    return (
                        <div key={index}>
                            <small style={{color:'blue'}}>{item['username']}</small>
                            <p style={{color:'green'}}>{item['message']}</p>
                        </div>
                    )
                })
                :
                null}
            {/* {
                messages['newMessages'] && messages['newMessages'].length && messages['newMessages'].length>0 ?
                    messages['newMessages'].map((item, index) => {
                        <div key={index}>
                            <small style={{color:'red'}}>{item['username']}</small>
                            <p style={{color:'black'}}>{item['message']}</p>
                        </div>
                    })
                    :
                    null
            } */}
            </div>
            <form onSubmit={handleAddMessage} style={{height:200, overflow:'auto', margin:30}}>
                <input type="text" placeholder="example of adding something to channel" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button type="submit">Add Message</button>
            </form>
        </>
    )
}

export default ChatExamplePage;