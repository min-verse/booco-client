import React, { useState, useEffect } from 'react';

function UserChatBubble({userMessage}) {

    const {username, message} = userMessage;

    return (
        <>
            <div className="chat-user-bubble">
                <p style={{ fontSize: 12, fontStyle: 'italic' }}>{username}</p>
                <div className="chat-text-style">
                    {message}
                </div>
            </div>
        </>
    )
};

export default UserChatBubble;