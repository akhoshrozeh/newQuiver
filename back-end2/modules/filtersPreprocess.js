require('dotenv').config();
// const fetch = require('node-fetch');
const axios = require('axios');

const preprocessFilters = async (filters) => {
// num.toString().includes('e')

    let coords = []
    let errors = []
    let geocodingData = []


    // BLANK VALUES
    for (let key in filters) {

        if (key.startsWith('min') && key != 'minPrice') {
            if (filters[key] == '' || isNaN(filters[key]) || parseInt(filters[key]) < 0) {
                filters[key] = (0).toString()
            }
        }

        // length, width, thickness, volume are of type  decimal(5,2) in mysql
        if (key.startsWith('max') && key != 'maxPrice') {
            if (filters[key] == '' || isNaN(filters[key]) || parseInt(filters[key]) > 999.99) {
                filters[key] = 999.99.toString()
            }
        }

        if (key == 'minPrice') {
            if (filters[key] == '' || isNaN(filters[key]) || parseInt(filters[key] < 0)) {
                filters[key] = (0).toString()
            }
        }

        if (key == 'maxPrice') {
            if (filters[key] == '' || isNaN(filters[key])) {
                filters[key] = (10000).toString()
            }
        }

    

        

        // convert to long/lat and add to object
        if (key == 'address' && filters[key] != '') {

            // Attempt to forward geocode the address from PositionStack API
            try {
                const addressQuery = filters[key];
                const req = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&query=${addressQuery}`
                const response = await axios.get(req)
                console.log('response:', response);

                // successful req
                if (response.status == 200) {
                    const geocodingDataRes = response.data.data[0];
                    if (geocodingDataRes == undefined) {
                        throw("BAD_ADDRESS")
                    }
                    console.log("response:\n", geocodingDataRes);

                    // ! PASS the coords
                    const longitude = geocodingDataRes.longitude;
                    const latitude = geocodingDataRes.latitude;
                    coords = [longitude, latitude]
                    geocodingData = geocodingDataRes

                }
            } catch(err) {
                filters[key] = '';
                errors.push(`Error: ${err}. Could not get location.`);
            }
        }

        // !make radius required on front end?
        if (key == 'radius') {
            if (isNaN(filters[key]) || filters[key] == '' || isNaN(parseInt(filters[key])) || parseInt(filters[key] < 0)) {
                filters[key] = (50).toString()
            }
        }




    }

    
    return [filters, coords, geocodingData, errors]

    // {
    //     minLen: '',
    //     maxLen: '',
    //     minWidth: '',
    //     maxWidth: '',
    //     minThickness: '',
    //     maxThickness: '',
    //     minVolume: '',
    //     maxVolume: '',
    //     minPrice: '',
    //     maxPrice: '',
    //     address: '',
    //     radius: '',
    //     searchQuery: ''
    //   }

}

module.exports = preprocessFilters;