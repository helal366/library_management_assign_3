import dotenv from "dotenv";
import {Server} from "http"
import mongoose from "mongoose";
import { uri } from "./configs/mongoDB";
import { app } from "./app";
dotenv.config();
let server:Server;
const PORT=5000;
async function main(){
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoDB using mongoose");
        server= app.listen(PORT, ()=>{
            console.log(`App is listening the port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
main()