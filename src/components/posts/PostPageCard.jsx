import React from 'react';
import { Link } from 'react-router-dom';

function PostPageCard({ currentPost, postAuthor }) {

    return (
        <>
            <div className="post-interior-content">
                <div className="post-interior-avatar">
                    <div className="mask mask-squircle w-16 h-16">
                        <Link to={postAuthor['id'] ? `/readers/${postAuthor['id']}` : `/home`}>
                            <img src={postAuthor['avatar'] ? postAuthor['avatar'] : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className="post-title">{currentPost['title']}</h1>
                    <small><em>written by:</em> {postAuthor['username']}</small>
                    <p className="post-content">{currentPost['content']}</p>
                    <small>on <em>{currentPost['time']}</em></small>
                </div>
            </div>
        </>
    )
}

export default PostPageCard;