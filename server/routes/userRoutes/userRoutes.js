import express from 'express'
import multer from 'multer'
const route=express.Router()
import { signup,login,userDetails,addImage } from '../../controller/userController/userController.js'
import upload from '../../confic/multer.js'



route.post('/signup',signup)

route.post('/login',login)
route.get('/user-details',userDetails)
route.post('/add-image/:userId',upload,addImage)

export default route