import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setCommentsUpdate } from '../state/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import ErrorAlert from '../ErrorAlert';
import PostPageCard from '../posts/PostPageCard';

function PostContent({ postId }) {

    const [currentPost, setCurrentPost] = useState();
    const [postAuthor, setPostAuthor] = useState('');
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const goToLanding = () => {
        navigate("/");
    }

    useEffect(() => {
        console.log('evoked');
        const getPost = async () => {
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`https://booco-app.onrender.com/posts/${postId}`, {
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

    const handleError = (err) => {
        setError(err);
    };

    const handleNewComment = (obj) => {
        setComments((prevComments) => {
            return [...prevComments, obj];
        });
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
                    <div className="post-card-container">
                        {currentPost &&
                            <PostPageCard currentPost={currentPost} postAuthor={postAuthor} />
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