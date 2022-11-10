import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CommentCard({ comment }) {

    const { id, content, created_at, time, get_user, get_post } = comment;
    console.log(comment);

    return (
        <>
        <div className="comment-container">
            <div className="comment-avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <Link to={get_user['id'] ? `/readers/${get_user['id']}` : `/home`}>
                        <img src={get_user['avatar'] ? get_user['avatar'] : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                    </Link>
                </div>
            </div>
            <div className="comment-content">
                <p className="comment-username">{get_user['username']} says</p>
                <p className="comment-thoughts">{content}</p>
                <small style={{ fontStyle: 'italic', fontSize:10 }}>posted on {time}</small>
            </div>
            </div>
        </>
    )
}

export default CommentCard;