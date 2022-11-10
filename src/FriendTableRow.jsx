import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FriendTableRow({friend, book}) {

    const {id, username} = friend;
    let currentRead = '';
    if(typeof book === "object"){
        if(book['title'].length > 30){
            currentRead = book['title'].slice(0,30) + "...";
        }else{
            currentRead = book['title'];
        }
    }else{
        currentRead = book.slice(0,15) + "...";
    }
    return (
        <>
            <tr>
                <td className="px-6 py-4 text-justify">{username}</td>
                <td className="px-6 py-4 text-justify flex-wrap">{currentRead}</td>
                <td className="px-6 py-4 text-justify"><Link to={`/readers/${id}`}  className="btn reading-card-button">Details</Link></td>
            </tr>
        </>
    );
}

export default FriendTableRow;