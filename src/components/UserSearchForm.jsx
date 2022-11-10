import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


function UserSearchForm() {
    const [readerSearch, setReaderSearch] = useState('');
    const navigate = useNavigate();
    function goToReaderSearch(query) {
        navigate(`/readersearch?user=${query}`);
    }

    const handleReaderSearchChange = (e) => {
        const newSearchValue = e.target.value.toLowerCase();
        setReaderSearch(newSearchValue);
    };

    const handleReaderSearch = (e) => {
        e.preventDefault();
        const encoded = encodeURIComponent(readerSearch);
        goToReaderSearch(encoded);
    };

    return (
        <>
            <form className="p-2" onSubmit={handleReaderSearch}>
                <input
                    type="text"
                    name="readerSearch"
                    value={readerSearch}
                    onChange={handleReaderSearchChange}
                    style={{ marginRight: 8, marginBottom: 5 }}
                    className="input input-bordered input-info w-full max-w-xs"
                    placeholder="Find fellow readers to add" />
                <button type="submit" className="btn">Search</button>
            </form>
        </>
    )
}

export default UserSearchForm;