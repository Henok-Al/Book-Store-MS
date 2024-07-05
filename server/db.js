import { mongoose } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

//connect to mongodb database
const Connection = async() => {
    try {
        mongoose.connect(process.env.URL)

        console.log("connected to mongodb")
    } catch (err) {
        console.log("Error: " + err)
    }
}

Connection()