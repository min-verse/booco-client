import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

function CommentForm({ post, handleError, handleNewComment }) {

    const [commentContent, setCommentContent] = useState('');

    const {id, user} = post;
    const {username} = user;
    console.log(post);

    const handleCommentChange = (e) => {
        const newComment = e.target.value;
        setCommentContent(newComment);
    };

    

    function submitComment(e) {
        e.preventDefault();
        let token = localStorage.getItem("token");
        fetch(`http://localhost:5000/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                postId: id,
                content: commentContent
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status == "401") {
                throw new Error("Unauthorized Request. Must be signed in.");
            }
        })
            .then((data) => {
                console.log(data);
                handleNewComment(data);
                setCommentContent('');
            })
            .catch((err) => {
                handleError(err);
            });
    }

    return (
        <>
            <form onSubmit={submitComment} style={{margin:30, display:'flex', justifyContent:'flex-end', alignItems:'center', flexDirection:'column'}}>
                <textarea
                    name="commentContent"
                    value={commentContent}
                    onChange={handleCommentChange}
                    className="textarea textarea-info"
                    placeholder={`Add a comment to ${username}'s post`}
                    style={{
                        display:'block',
                        marginTop:10,
                        marginBottom:10,
                        width:'80%'
                    }}></textarea>
                <button type="submit" className="btn" style={{alignItems:'right'}}>Add Comment</button>
            </form>
        </>
    );
}

export default CommentForm;