import React, {useState, useEffect} from "react";

function CommentCard({comment}){

    const {id, content, created_at, get_user, get_post } = comment;

    return(
        <>
            <p>{get_user['username']} says</p>
            <p>{content}</p>
            <small>posted on {created_at}</small>
        </>
    )
}

export default CommentCard;