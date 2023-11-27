var express = require('express');
var router = express.Router();
const connection = require('../modules/mysqlDB.js');
const preprocessFilters = require('../modules/filtersPreprocess.js')
// const aws = require('../aws-s3.js');
require('dotenv').config();

const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
 

async function queryDBforBoards(filters) {
    console.log("Before preprocess:", filters);
    let sqlQuery;
    let queryInputs;
    
    // sanitize inputs
    filters = await preprocessFilters(filters);

    // if (filters == "Error: API request fail; Check address." || filters == "BAD_ADDRESS") {
    //     console.log(filters);
    // }
    const coords = filters [1]
    const geocodingData = filters[2]
    const errors = filters[3]

    if (errors.length == 0) {
        console.log('No errors in getting location.');
    }
  
    filters = filters[0]


    console.log("After preprocess:", filters);
    console.log('coords', coords);
    

    // * No location given from client so we'll just show boards that match the description or browse
    // * coords should be empty array
    if (filters['address'] == '') {
        sqlQuery =  `SELECT * FROM \`ForSaleBoards\`       
                        WHERE 
                        (\`length\` >= ? AND \`length\` <= ?) AND 
                        (\`width\` >= ? AND \`width\` <= ?) AND 
                        (\`thickness\` >= ? AND \`thickness\` <= ?) AND 
                        (\`volume\` >= ? AND \`volume\` <= ?) AND 
                        (\`price\` >= ? AND \`price\` <= ?)
                    `

        queryInputs = [filters['minLen'], 
                        filters['maxLen'], 
                        filters['minWidth'], 
                        filters['maxWidth'], 
                        filters['minThickness'], 
                        filters['maxThickness'], 
                        filters['minVolume'], 
                        filters['maxVolume'], 
                        filters['minPrice'], 
                        filters['maxPrice']]
    }

    // * Calculate proximity
    // FORMAT: LONGITUDE, LATITUDE
    // * coords should be [long, lat]
    else if (filters['address'] != '' ) {
        if (coords == []) {
            console.log('EMPTY COORDS');

        }

        sqlQuery = 'SELECT fsb.*, u.userID, u.posts, ST_asText(u.location) FROM `ForSaleBoards` fsb JOIN `Users` u ON fsb.userID = u.userID WHERE ST_Distance_Sphere(u.location, POINT(?, ?)) / 1000 <= ? AND(fsb.length >= ? AND fsb.length <= ?) AND (fsb.width >= ? AND fsb.width <= ?) AND (fsb.thickness >= ? AND fsb.thickness <= ?) AND (fsb.volume >= ? AND fsb.volume <= ?) AND (fsb.price >= ? AND fsb.price <= ?)'


        queryInputs = [ coords[0],
                        coords[1],
                        filters['radius'],
                        filters['minLen'], 
                        filters['maxLen'], 
                        filters['minWidth'], 
                        filters['maxWidth'], 
                        filters['minThickness'], 
                        filters['maxThickness'], 
                        filters['minVolume'], 
                        filters['maxVolume'], 
                        filters['minPrice'], 
                        filters['maxPrice']]


    }
    
    const queryPromise = new Promise((resolve, reject) => {
        connection.execute(
            sqlQuery, 
            queryInputs,
            function(err, results, fields) {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err); // Reject the promise with the error
                } else {
                    // console.log(results); // Display results
                    resolve(results); // Resolve the promise with the results
                }
            }
          );
    } )


    return [queryPromise, geocodingData, errors]
}



/* POST home page. */
router.post('/', async function(req, res, next) {

    let dbResults = await queryDBforBoards(req.body);  
    response = {}
    response.rows = await dbResults[0]
    response.geoData = dbResults[1]
    response.errors = dbResults[2]

    // console.log('dbresults LOG', dbResults.length);
    // console.log('the REQUEST:', dbResults);

    // get the postIDs which are used to fetch the images from the AWS S3 bucket
    let postIDs = []
    for (let i=0; i < dbResults.length; i++) {
        postIDs.push(dbResults[i].postID)
    }

    // let data = await  s3.getObject({Bucket: process.env.BUCKET_NAME, Key: postIDs[0] })
    // console.log(postIDs);
//   res.render('index', { title: 'Express' });

    res.json(response);
});



router.get('/', async function(req, res, next) {
    let dbResults = await queryDBforBoards();  
    // console.log(dbResults);
    let postIDs = []
    for (let i=0; i < dbResults.length; i++) {
        postIDs.push(dbResults[i].postID)
    }
    let key = String(postIDs[0]) + ".png";
    console.log('key', key);

    // let data = await s3.getObject({Bucket: process.env.BUCKET_NAME, Key: (postIDs[0]+".png") })
    // res.set('Content-Type', data);
    // console.log('content type', data);
    // Send the image data as the response
    res.send(dbResults);

    // s3.listBuckets({}, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else     console.log(data);  
    // });

    // let r = await s3.listObjectsV2({ Bucket: process.env.BUCKET_NAME }).promise();
    // let x = r.Contents.map(item => item.Key);
    // console.log(x);
    // res.json(x)

    // let data = await s3.getObject({Bucket: process.env.BUCKET_NAME, Key: postIDs[0] })
    // res.set('Content-Type', data.ContentType);
    // console.log('content type', data.ContentType);
    // // Send the image data as the response
    // res.send(data.Body);
    // console.log("PSOTPSOTPSOTPSOT:", data)
//   res.render('index', { title: 'Express' });
//   res.json(dbResults);
});

module.exports = router;
