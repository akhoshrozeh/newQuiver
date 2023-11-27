require('dotenv').config()


const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});


module.export = aws;
