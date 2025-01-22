import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB=async()=>{


    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Mongo db connected successfully'))
    .catch((err)=>{
        console.log('mongo error :',err)
    })    
}
export default connectDB
