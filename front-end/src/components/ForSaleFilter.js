import { useState } from "react";
import { useEffect } from "react";

// props has a function updateParentBoards() which sends the state of forsaleBoards after a request to the server is made
function ForSaleFilter (props) {

    const [filters, setFilters] = useState({
        minLen: '',
        maxLen: '',
        minWidth: '',
        maxWidth: '',
        minThickness: '',
        maxThickness: '',
        minVolume: '',
        maxVolume: '',
        minPrice: '',
        maxPrice: '',
        address: '',
        radius: '',
        searchQuery: ''
    });

    // const [geoData, setGeoData] = useState({});

    // prevent the component from requesting to the server on render; only after applying filters
    const [shouldFetch, setShouldFetch] = useState(false);

    const server = "http://localhost:3100/for-sale";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setFilters({
            // ...filters,
            minLen: e.target.elements.minLen.value,
            maxLen: e.target.elements.maxLen.value,
            minWidth: e.target.elements.minWidth.value,
            maxWidth: e.target.elements.maxWidth.value,
            minThickness: e.target.elements.minThickness.value,
            maxThickness: e.target.elements.maxThickness.value,
            minVolume: e.target.elements.minVolume.value,
            maxVolume: e.target.elements.maxVolume.value,
            minPrice: e.target.elements.minPrice.value,
            maxPrice: e.target.elements.maxPrice.value,
            address: e.target.elements.address.value,
            radius: e.target.elements.radius.value,
            searchQuery: e.target.elements.searchQuery.value,
        });

        console.log('filters:', filters);
        setShouldFetch(true);

    }


    useEffect(() => {

        if (shouldFetch == true) {
            const _headers = {'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,GET,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'};
    
            const sendForm = async () => {
                console.log('sending!');
                try {
                    const req = {
                        method: 'POST', 
                        headers: _headers,
                        body: JSON.stringify(filters)
                    };
                    const res = await fetch(server, req);
                    const resJSON = await res.json();
                    // console.log('resJSON', resJSON);
                    // setGeoData(resJSON.geoData)
                    // contains rows, geoData, errors objects. POssible that geodata or errors is empty
                    props.updateForsaleBoards(resJSON);
                    // console.log('geoData',geoData);

        
                } catch (error) {
                    console.log('Error:', error);
                }
            }
    
            sendForm();

        }

        
      }, [shouldFetch, filters]);

    //   useEffect(() => {
    //     console.log('geoData set!!!', geoData);
    //   }, [geoData])


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>minlen</p>
                <input type="number" min="0" name="minLen" placeholder="Min"></input>
                <p>maxlen</p>
                <input type="numvber" name="maxLen" placeholder="Max"></input>
                <p>minWidth</p>
                <input type="number" min="0" name="minWidth" placeholder="Min"></input>
                <p>maxWidth</p>
                <input type="number" name="maxWidth" placeholder="Max"></input>
                <p>min thick</p>
                <input type="number" min="0" name="minThickness" placeholder="Min"></input>
                <p>max thick</p>
                <input type="number" name="maxThickness" placeholder="Max"></input>
                <p>min volume</p>
                <input type="number" min="0" name="minVolume" placeholder="Min"></input>
                <p>max volume</p>
                <input type="number" name="maxVolume" placeholder="Max"></input>
                <p>min price</p>
                <input type="number" min="0" name="minPrice" placeholder="Min"></input>
                <p>max price</p>
                <input type="number" name="maxPrice" placeholder="Max"></input>
                <p>address</p>
                <input type="text" name="address" placeholder="Address"></input>
                <p>radius</p>
                <input type="number" name="radius" placeholder="Radius (km)"></input>
                <p>search</p>
                <input type="text" name="searchQuery" placeholder="Search"></input>
                <br></br>
                <button type="submit">Apply Filters</button>
            </form>
        </div>
    );
}


export default ForSaleFilter;