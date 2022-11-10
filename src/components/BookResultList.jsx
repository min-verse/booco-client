import React, {useEffect, useState} from 'react';
import BookResultCard from './BookResultCard';

function BookResultList({books}){

    return(
        <>
            {books.map((book)=>{
                return (
                    <BookResultCard
                    key={book.id}
                    book={book} 
                    />
                );
            })}
        </>
    )
}

export default BookResultList;