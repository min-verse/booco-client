import React from 'react';
import ReaderResultList from '../readers/ReaderResultList';

function ReaderResultsContent({readers}) {

  

    return (
        <>
            <ReaderResultList readers={readers} />
        </>
    )
}

export default ReaderResultsContent;