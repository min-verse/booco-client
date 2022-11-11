import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import NavBarUser from '../NavBarUser';
import BookResultsContent from '../content/BookResultsContent';
import ErrorAlert from '../ErrorAlert';
import BookSearchForm from '../BookSearchForm';

function BookResultsPage() {

    const [bookSearch, setSearch] = useSearchParams();
    const [bookResults, setBookResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const titleSearch = bookSearch.get('title') ? bookSearch.get('title') : '';
        const authorSearch = bookSearch.get('author') ? bookSearch.get('author') : '';
        let token = localStorage.getItem("token");
        fetch("http://localhost:5000/search_books", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                title_search: titleSearch,
                author_search: authorSearch
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status == "401") {
                    throw new Error("Unauthorized Request. Must be signed in.");
                }
            })
            .then((data) => {
                setBookResults(data);
            })
            .catch((err) => {
                setError(err);
            });
    }, [bookSearch]);

    return (
        <>
            <NavBarUser />
            <BookSearchForm />
            {error && error.length && error.length > 0 ?
                <ErrorAlert id="auto-hide-message" errors={error} />
                :
                null}
            <BookResultsContent books={bookResults} />
        </>
    )
}

export default BookResultsPage;