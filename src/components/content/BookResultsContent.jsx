import React from 'react';
import BookResultList from '../books/BookResultList';

function BookResultsContent({books}) {

    return(
        <>
        <h1>Book Results Page</h1>
        <BookResultList books={books}/>
        </>
    );
}

export default BookResultsContent;