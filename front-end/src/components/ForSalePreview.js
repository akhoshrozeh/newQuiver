import React from "react";

function ForSalePreview(props) {
    const board = props.board;
    const s3Links = []
    

    return (
        <div>
            <div>{board.userID}</div>
            <div>{board.postID}</div>
            <div>{board.brand}</div>
            <div>{board.boardCondition}</div>
            <div>{board.type}</div>
            <div>length: {board.length}</div>
            <div>width: {board.width}</div>
            <div>thickness: {board.thickness}</div>


        
        
        </div>

    );

}


export default ForSalePreview;