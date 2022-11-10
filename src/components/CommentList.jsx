import React, {useState, useEffect} from "react";
import CommentCard from "./CommentCard";

function CommentList({comments}){

    return(<>
    {comments.map((item)=>{
        return (
            <CommentCard 
                key={item.id}
                comment = {item}
            />
        )
    })}
    </>
    );
}

export default CommentList;