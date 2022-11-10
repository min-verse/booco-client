import React, { useEffect, useState } from 'react';
import SignupModal from '../SignupModal';
import { Link } from 'react-router-dom';
import { Hero, Button, Toast, Artboard } from 'react-daisyui';
import Typewriter from 'typewriter-effect';
import { useSelector, useDispatch } from 'react-redux';
import ReadingCard from '../ReadingCard';
import PostForm from '../PostForm';
import BookCard from '../BookCard';
import PostList from '../PostList';

function BookContent({ bookId }) {

    const [currentBook, setCurrentBook] = useState();
    const [posts, setPosts] = useState([]);



    useEffect(() => {
        console.log('evoked');
        const getBook = async () => {
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/books/${bookId}`, {
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
                        setCurrentBook(data);
                        const reversedPosts = data['posts'].reverse();
                        setPosts(reversedPosts);
                    })
                    .catch((err) => console.error(err));
            } else {
                alert("Not logged in.");
            }
        };
        getBook();
    }, []);

    const handlePostSubmit = (obj) => {
        console.log(obj);
        setPosts((prevPosts)=>{
            return [obj, ...prevPosts];
        })
        
    };

    return (
        <>
            <h1 style={{
                fontSize: 30,
                fontStyle: 'italic',
                paddingLeft: 50
            }}>{bookId}</h1>
            <div className="book-page">
                {currentBook && <BookCard book={currentBook} />}
            </div>
            <div>
                {currentBook && <>
                    <PostForm book={currentBook} handlePostSubmit={handlePostSubmit} />
                    <PostList posts={posts} />
                </>}
            </div>
        </>
    )
}

export default BookContent;