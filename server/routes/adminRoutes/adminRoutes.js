import express from 'express'
const route = express.Router()


route.get('/',(req,res)=>{
    res.send("i am the admine")
})









export default route