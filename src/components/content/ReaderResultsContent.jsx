import React from 'react';
import ReaderResultList from '../ReaderResultList';

function ReaderResultsContent({readers}) {

  

    return (
        <>
            <ReaderResultList readers={readers} />
        </>
    )
}

export default ReaderResultsContent;