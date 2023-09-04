import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";
dotenv.config()

mongoose.connect(process.env.MONGODB_PATH, () => {
console.log('connect');
}, (e) => console.log(e))

const PORT = process.env.SERVER_PORT || 9000

const app = express()

//cors middleware responsible for allowing the frontend to access the backend
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json()) //this line is responsible for allowing the backend to accept json data when there is a post request.
app.use(express.urlencoded()) //this line is responsible for allowing the backend to accept urlencoded data when there is a post request.
app.use(api)
//so if it was app.use('api/index',api) then frontend would have to call api/index/projects to get the data but since its not it calls api/projects. It favours here that there is only one route in the api file. If there were more then it would be better to use app.use('api/index',api) and then call api/index/projects from the frontend

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`)
})
//so basically backend is listening at port 9000 and frontend is listening at port 3000. So when the frontend makes a request to the backend it is made to the backend port 9000.