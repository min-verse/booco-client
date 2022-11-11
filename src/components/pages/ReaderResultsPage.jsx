import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import NavBarUser from '../NavBarUser';
import ErrorAlert from '../ErrorAlert';
import ReaderResultsContent from '../content/ReaderResultsContent';
import UserSearchForm from '../UserSearchForm';

function ReaderResultsPage() {

    const [readerSearch, setReaderSearch] = useSearchParams();
    const [readerResults, setReaderResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const userSearch = readerSearch.get('user') ? readerSearch.get('user') : '';

        let token = localStorage.getItem("token");
        fetch("http://localhost:5000/search_readers", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                reader_search: userSearch,
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
                setReaderResults(data);
            })
            .catch((err) => {
                setError(err);
            });
    }, [readerSearch]);

    return (
        <>
            <NavBarUser />
            {error && error.length && error.length > 0 ?
                <ErrorAlert id="auto-hide-message" errors={error} />
                :
                null}
            <UserSearchForm />
            <ReaderResultsContent readers={readerResults} />
        </>
    )
}

export default ReaderResultsPage;