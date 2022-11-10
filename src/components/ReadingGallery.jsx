import React from 'react';
import ReadingCard from './ReadingCard';
import { Progress } from 'react-daisyui';

function ReadingGallery({reading}){

    return(
        <>
        <div className="reading-gallery-height flex w-full mx-4 space-x-10 flex-nowrap overflow-x-auto p-8 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl">
                {reading && reading.length && reading.length > 0 ?
                reading.map((item) => {
                    return (
                        <ReadingCard
                            key={item.id}
                            book={item.book}
                            progress={item.progress}
                        />
                    );
                })
                :
                <div className='reading-card'>
            {/* <div className="reading-card-image-container">
                <img src={'https://cdn.thestorygraph.com/bm5pvy09tuu7vrjmogrej8e9q388'} className="reading-card-image" />
            </div>
            <div className="reading-card-info">
                <h1>If You Could See the Sun</h1>
                <small style={{ fontStyle: 'italic' }}>Ann Liang</small>
            </div>
            
                <Progress className="w-56 my-2 progress-blue" value={85} max={100} />
            
            <Button className="reading-card-button">More Info</Button> */}
            <div className="reading-card-image-container">
                <img src={'https://www.kindpng.com/picc/m/494-4945860_cartoon-book-with-blank-cover-printable-blank-book.png'} className="reading-card-image" />
            </div>
            <div className="reading-card-info">
                <h1 style={{color:'gray'}}>No titles added to reading</h1>
                <small style={{ fontStyle: 'italic', color:'gray' }}>Add titles to "reading" to see titles</small>
            </div>
            
                <Progress className="w-56 my-2 progress-accent"  style={{color:'gray'}} value={0} max={100} />
            
            <button  className="btn reading-card-button" disabled>No Books Added to Reading</button>
            {/* <Button className="reading-card-button"><Link to={`/books/${id}`}>More Info</Link></Button> */}
        </div>
                }
            </div>
        </>
    )
};

export default ReadingGallery;