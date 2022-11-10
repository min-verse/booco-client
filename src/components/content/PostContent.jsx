import React, { useEffect, useState } from 'react';
import SignupModal from '../SignupModal';
import { Link } from 'react-router-dom';
import { setComments } from '../state/user';
import { Hero, Button, Toast, Artboard } from 'react-daisyui';
import { setCommentsUpdate } from '../state/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useSelector, useDispatch } from 'react-redux';
import ReadingCard from '../ReadingCard';
import BookCard from '../BookCard';
import PostList from '../PostList';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import ErrorAlert from '../ErrorAlert';
import PostPageCard from '../PostPageCard';

function PostContent({ postId }) {

    const [currentPost, setCurrentPost] = useState();
    const [postAuthor, setPostAuthor] = useState('');
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const goToLanding = () => {
        navigate("/");
    }

    useEffect(() => {
        console.log('evoked');
        const getPost = async () => {
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/posts/${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else if (res.status == "401") {
                            throw new Error("Unauthorized Request. Must be signed in.");
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        setCurrentPost(data);
                        setPostAuthor(data['user']);
                        setComments(data['comments']);
                    })
                    .catch((err) => console.error(err));
            } else {
                goToLanding();
            }
        };
        getPost();
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        console.log("I'm submitted!");
    };

    const handleError = (err) => {
        setError(err);
    };

    const handleNewComment = (obj) => {
        setComments((prevComments) => {
            return [...prevComments, obj];
        });
        // check this line of code later haha
        dispatch(setCommentsUpdate([...user['comments'], obj]));
    };

    return (
        <>
            {currentPost &&
                <>

                    <Link to={`/books/${currentPost['book']['id']}`} className="btn" style={{ margin: 20 }}><FontAwesomeIcon style={{ color: 'white', marginRight: 8 }} icon={faChevronLeft} /> Back to {currentPost['book']['title']}</Link>
                    {error && error.length && error.length > 0 ?
                        <ErrorAlert />
                        :
                        null}
                    {/* <h1 style={{
                        fontSize: 30,
                        fontStyle: 'italic',
                        paddingLeft: 50
                    }}>{postId}</h1> */}
                    <div className="post-card-container">
                        {currentPost &&
                            <PostPageCard currentPost={currentPost} postAuthor={postAuthor} />
                            // <div style={{ padding: 20 }}>
                            //     <h1 className="post-title">{currentPost['title']}</h1>
                            //     <small><em>written by:</em> {postAuthor['username']}</small>
                            //     <p className="post-content">{currentPost['content']}</p>
                            //     <small>on <em>{currentPost['time']}</em></small>
                            // </div>
                        }
                    </div>
                    <CommentForm handleError={handleError} post={currentPost} handleNewComment={handleNewComment} />
                    <div className="all-comments-container">
                        <CommentList comments={comments} />
                    </div>
                </>
            }
        </>
    )
}

export default PostContent;