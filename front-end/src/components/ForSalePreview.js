import React from "react";

function ForSalePreview(props) {
    const board = props.board;
    const s3URL = "https://myquiverv0-forsaleboards.s3.amazonaws.com/";
    
    function generateCarouselHTML(postID, numPosts) {
        if (numPosts > 1) {
            let indicators = [];
            let carouselInner = [];

            for (let i = 0; i < numPosts; i++) {
                indicators.push(
                    <button
                        key={i}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={i}
                        aria-label={`Slide ${i + 1}`}
                    ></button>
                );

                carouselInner.push(
                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                        <img
                            src={`${s3URL + postID + (i === 0 ? "_0.png" : `_${i}` + ".png")}`}
                            className="d-block w-100"
                            alt={`Slide ${i + 1}`}
                        />
                    </div>
                );
            }

            return (
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">{indicators}</div>
                    <div className="carousel-inner">{carouselInner}</div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            );
        } else {
            return (
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={`${s3URL + postID + "_0.png"}`}
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                </div>
            );
        }
    }
 
    return (
        <div>
           
           
            {generateCarouselHTML(board.postID, props.numPosts)}
            <div>Brand: {board.brand}</div>
            <div>Condition: {board.boardCondition}</div>
            <div>Type: {board.type}</div>
            <div>Length: {board.length}</div>
            <div>Width: {board.width}</div>
            <div>Thickness: {board.thickness}</div>
            <div>Volume: {board.volume}</div>
            <div>Price: {board.price}</div>
        </div>

    );

}


export default ForSalePreview;