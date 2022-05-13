import "express-async-errors"
import dotenv from 'dotenv'
import config from './config'

import express from "express"
import logger from 'morgan'
import https from 'https'
import fs from 'fs'
import path from 'path'
import helmet from "helmet"
import cors from "cors"
import GenericErrorHandler from './middlewares/genericErrorHandler'
import ApiError from "../src/error/apierror"



const envPath = config?.production 
? "./env/.prod"
: "./env/.dev"


dotenv.config({
    path: envPath
})

const app = express();

app.use(logger(process.env.LOGGER))
app.use(helmet())
app.use(cors({
    origin:"*"
}))

app.use(express.json({
    limit:"1mb"
}))

app.use('/',(req,res)=>{
    throw new ApiError("Bir hata oluştu",404,"Something Wrong")
    res.json({message:'success'});

})


app.use(express.urlencoded({extended:true}))
app.use(GenericErrorHandler);


if(process.env.HTTPS_ENABLED === 'true'){

    const key = fs.readFileSync(path.join(__dirname,'./certificate/key.pem')).toString()
    const cert = fs.readFileSync(path.join(__dirname,'./certificate/cert.pem')).toString()
    const server = https.createServer({
        key:key,
        cert:cert


    },app)

    server.listen(process.env.PORT,()=>{
        console.log("Server running on port " + process.env.PORT)
    })
}
else {
    app.listen(process.env.PORT,()=>{
        console.log("Server running on port " + process.env.PORT);
    })
}

