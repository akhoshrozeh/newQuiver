import React from "react";

import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function ForSalePreview(props) {
    const board = props.board;
    const s3URL = "https://myquiverv0-forsaleboards.s3.amazonaws.com/";
    
    // function generateCarouselHTML(postID, numPictures) {
    //     if (postID == "0127961066545") {
    //         console.log('postID:', postID, numPictures);

    //     }

        
    //     if (numPictures > 1) {
    //         let indicators = [];
    //         let carouselInner = [];

    //         for (let i = 0; i < numPictures; i++) {
    //             indicators.push(
    //                 <button
    //                     key={i}
    //                     type="button"
    //                     data-bs-target={"X" + postID}
    //                     data-bs-slide-to={i}
    //                     aria-label={`Slide ${i + 1}`}
    //                 ></button>
    //             );

    //             carouselInner.push(
    //                 <div key={i} className={`carousel-item${i == 0 ? ' active' : ''}`}>
    //                     <img
    //                         src={`${s3URL + postID + (i === 0 ? "_0.png" : `_${i}` + ".png")}`}
    //                         className="d-block w-100"
    //                         alt={`Slide ${i + 1}`}
    //                     />
    //                 </div>
    //             );
    //         }

    //         return (
    //             <div id={"X" + postID} className="carousel slide">
    //                 <div className="carousel-indicators">{indicators}</div>
    //                 <div className="carousel-inner">{carouselInner}</div>
    //                 <button
    //                     className="carousel-control-prev"
    //                     type="button"
    //                     data-bs-target={"X"+ postID}
    //                     data-bs-slide="prev"
    //                 >
    //                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                     <span className="visually-hidden">Previous</span>
    //                 </button>
    //                 <button
    //                     className="carousel-control-next"
    //                     type="button"
    //                     data-bs-target={"X" + postID}
    //                     data-bs-slide="next"
    //                 >
    //                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                     <span className="visually-hidden">Next</span>
    //                 </button>
    //             </div>
    //         );
    //     }
        
    //     // * Only one picture for the posting; no carousel needed
    //     else {
    //         return (
    //             <div className="carousel-inner">
    //                 <div className="carousel-item active">
    //                     <img
    //                         src={`${s3URL + postID + "_0.png"}`}
    //                         className="d-block w-100"
    //                         alt="..."
    //                     />
    //                 </div>
    //             </div>
    //         );
    //     }
    // }

    function generateCarouselHTML(postID, numPictures) {
        let carouselItems = []

        for (let i = 0; i < numPictures; i++) {
            carouselItems.push(
                <Carousel.Item>
                    <img 
                    src={s3URL + postID + "_" + i + ".png"}
                    className="d-flex w-100 "
                    style={{ height: '300px', objectFit: 'contain' }}
                    >
                    </img>
                </Carousel.Item>
            );
        }

        return (
            <Carousel>
                {carouselItems}
            </Carousel>
        )
        

    }
 
    return (
        <div>
        

           
            {generateCarouselHTML(board.postID, board.numPictures)}
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