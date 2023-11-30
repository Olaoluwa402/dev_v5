import {config} from "../Config/config.js"
import mongoose from "mongoose"
export const dbConnect =()=>{
    const connection = mongoose.connect(config.mongodb.db_url);
    return connection;
};