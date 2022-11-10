import React, { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'react-router-dom';
import NavBarLanding from '../NavBarLanding';
import NavBarUser from '../NavBarUser';
import HomeContent from '../content/HomeContent';
import BookContent from '../content/BookContent';
import BookResultsContent from '../content/BookResultsContent';
import ReaderResultsContent from '../content/ReaderResultsContent';
import UserSearchForm from '../UserSearchForm';

function ReaderResultsPage() {

    const [readerSearch, setReaderSearch] = useSearchParams();
    const [readerResults, setReaderResults] = useState([]);
    console.log(readerSearch.get('user'));

    useEffect(() => {
        const userSearch = readerSearch.get('user') ? readerSearch.get('user') : '';
        
        let token = localStorage.getItem("token");
        fetch("http://localhost:5000/search_readers", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:JSON.stringify({
                reader_search:userSearch,
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
                setReaderResults(data);
            })
            .catch((err) => {
                console.error(err);
                
            });
    }, [readerSearch]);

    return (
        <>
            <NavBarUser />
            <UserSearchForm />
            <ReaderResultsContent readers={readerResults}/>
        </>
    )
}

export default ReaderResultsPage;