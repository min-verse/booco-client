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
import BookResultList from '../BookResultList';

function BookResultsContent({books}) {

  

    return(
        <>
        <h1>Book Results Page</h1>
        <BookResultList books={books}/>
        </>
    );
}

export default BookResultsContent;