import React from 'react';
import BookResultList from '../books/BookResultList';

function BookResultsContent({books}) {

    return(
        <>
        <h1 style={{marginLeft:25}}>Book Results Page - {books ? `${books.length} titles found` : `No titles match the query`}</h1>
        <BookResultList books={books}/>
        </>
    );
}

export default BookResultsContent;