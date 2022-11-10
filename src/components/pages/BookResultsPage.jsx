import React, { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'react-router-dom';
import NavBarLanding from '../NavBarLanding';
import NavBarUser from '../NavBarUser';
import HomeContent from '../content/HomeContent';
import BookContent from '../content/BookContent';
import BookResultsContent from '../content/BookResultsContent';
import BookSearchForm from '../BookSearchForm';

function BookResultsPage() {

    const [bookSearch, setSearch] = useSearchParams();
    const [bookResults, setBookResults] = useState([]);

    useEffect(() => {
        const titleSearch = bookSearch.get('title') ? bookSearch.get('title') : '';
        const authorSearch = bookSearch.get('author') ? bookSearch.get('author') : '';
        let token = localStorage.getItem("token");
        fetch("http://localhost:5000/search_books", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:JSON.stringify({
                title_search:titleSearch,
                author_search:authorSearch
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
                console.log(data);
                setBookResults(data);
            })
            .catch((err) => {
                console.error(err);
                
            });
    }, [bookSearch]);

    return (
        <>
            <NavBarUser />
            <BookSearchForm />
            <BookResultsContent books={bookResults}/>
        </>
    )
}

export default BookResultsPage;