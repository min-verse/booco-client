import React from 'react';
import { Button, Progress } from 'react-daisyui';
import { Link } from 'react-router-dom';

function ReadingCard({book, progress}) {
    
    const {id, title, author, cover} = book;

    return (
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
                <img src={cover} className="reading-card-image" />
            </div>
            <div className="reading-card-info">
                <h1>{title}</h1>
                <small style={{ fontStyle: 'italic' }}>{author}</small>
            </div>
            
                <Progress className="w-56 my-2 progress-accent" value={progress} max={100} />
            
            <Link to={`/books/${id}`}  className="btn reading-card-button">More Info</Link>
            {/* <Button className="reading-card-button"><Link to={`/books/${id}`}>More Info</Link></Button> */}
        </div>
    )
}

export default ReadingCard;