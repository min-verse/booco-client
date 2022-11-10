import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'react-daisyui';
import { useNavigate } from 'react-router';

function BookSearchForm() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    function goToResults(titleQuery, authorQuery) {
        if(titleQuery && authorQuery){
            navigate(`/browse?title=${titleQuery}&author=${authorQuery}`);
        }else if(titleQuery){
            navigate(`/browse?title=${titleQuery}`);
        }else{
            navigate(`/browse?author=${authorQuery}`);
        }
    }

    const handleTitleChange = (e)=>{
        const newTitle = e.target.value.toLowerCase();
        setTitle(newTitle);
    }

    const handleAuthorChange = (e)=>{
        const newAuthor = e.target.value.toLowerCase();
        setAuthor(newAuthor);
    }

    function handleSearch(e) {
        e.preventDefault();
        const titleEncoded = title ? encodeURIComponent(title) : '';
        const authorEncoded = author ? encodeURIComponent(author) : '';
        goToResults(titleEncoded, authorEncoded);
    }

    return (
        <>
            <Form onSubmit={handleSearch} style={{margin:10}}>
                <label>Search for book by title</label>
                <Input
                    onChange={handleTitleChange}
                    value={title}
                    name="searchTitle"
                    bordered
                    type="text"
                    placeholder="Search for a title" />
                <label>Search for book by author</label>
                <Input
                    onChange={handleAuthorChange}
                    value={author}
                    name="searchAuthor"
                    bordered
                    type="text"
                    placeholder="Search for an author" />
                <Button type="submit">Search</Button>
            </Form>
        </>
    );
}

export default BookSearchForm;