import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDB from './confic/mongodb.js'
import userRoute from './routes/userRoutes/userRoutes.js'
import adminRout from './routes/adminRoutes/adminRoutes.js'
import cors from 'cors'
const app = express()
dotenv.config()

connectDB()
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use('/',userRoute)
app.use('/admin',adminRout)
app.listen(3000,()=>{
    console.log("server running succesfully http://localhost:3000")
})