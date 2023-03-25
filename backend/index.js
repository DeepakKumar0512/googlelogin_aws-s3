const express= require("express");
const app = express()
var cors = require("cors")
const port=5000
const aws = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")

require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require("dotenv").config()
app.use(cors())

// backend listening port
app.listen(port,()=>{
    console.log(`Backend listening at port ${port}`)
});

// config aws and get details of aws bucket from .env file 
aws.config.update({
    secretAccessKey:process.env.ACCESS_SECRET,
    accessKeyId:process.env.ACCESS_KEY,
    region:process.env.REGION, 
})

// get Bucket name from .env file
const BUCKET = process.env.BUCKET
const s3 = new aws.S3()

//to store file in aws-s3 bucket
var upload = multer({
    storage: multerS3({
    bucket:'s3-node.js',
    s3:s3,
    key:function(req,file,cb){
        cb(null,file.originalname)
    }
  })  
})

//post request for upload a file
app.post('/',upload.single('file'), (req,res,next)=>{
    res.send("Successfully Uploaded")
})

//get request for get a list of files
app.get("/list",async(req,res)=>{
    let r=await s3.listObjects({Bucket:BUCKET}).promise()
    let x=r.Contents.map(item=>item.Key);
    res.send(x)
})

//get request for download a specific file by add filename in the url
app.get("/download/:filename",async(req,res)=>{
    const filename=req.params.filename
    let x=await s3.getObject({Bucket:BUCKET,Key:filename}).promise()
    res.send(x.Body)
})