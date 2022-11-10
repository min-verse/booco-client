import React, { useEffect, useState } from 'react';
import ReaderResultCard from './ReaderResultCard';

function ReaderResultList({ readers }) {

    return (
        <>
            {readers && readers.length && readers.length > 0 ? readers.map((reader) => {
                return (
                    <ReaderResultCard
                        key={reader.id}
                        reader={reader}
                    />
                );
            })
                :
                <h1>No readers found</h1>
            }
        </>
    )
}

export default ReaderResultList;