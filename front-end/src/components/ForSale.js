import ForSaleFilter from "./ForSaleFilter";
import ForSalePreview from "./ForSalePreview";
import { useState } from "react";
import { useEffect } from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../index.css";


function ForSale () {
    const [forsaleBoards, setForsaleBoards] = useState(null);
    const [geoData, setGeoData] = useState(null);


    // input is a JSON object which contains the MySQL rows of boards and also a geoData object
    const updateForsaleBoards = (updatedBoards) => {
        setForsaleBoards(updatedBoards.rows)
        setGeoData(updatedBoards.geoData)
    }

    useEffect(() => {
    }, [forsaleBoards])



    if (forsaleBoards !== null) {


        return (
            <div className="for-sale-page">
                <div className="for-sale-filter">
                    <ForSaleFilter updateForsaleBoards={updateForsaleBoards}/>
                    {geoData && (
                        <div className="show-loc">
                            Showing results within radius of {geoData.label}
                        </div>
                    )}
                </div>
                
                <ul className="for-sale-list">
                    {forsaleBoards.map(function(b){
                    return <li className="card" key={b.postID}>
                        <ForSalePreview  board={b}/>
                        </li>
                })}
                </ul>
    
            </div>
        )
        
    }
    
    else {
        return (
            <div className="for-sale-page">
                <div className="for-sale-filter">

                    <ForSaleFilter updateForsaleBoards={updateForsaleBoards}/>
                </div>
                
            </div>
        );
    }
}

export default ForSale;