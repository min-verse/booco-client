import React from 'react';

function FriendChatBubble({friendMessage}) {

    const {username, message} = friendMessage;

    return (
        <>
            <div className="chat-friend-bubble">
                <p style={{ fontSize: 12, fontStyle: 'italic' }}>{username}</p>
                <div className="chat-text-style">
                    {message}
                </div>
            </div>
        </>
    )
};

export default FriendChatBubble;