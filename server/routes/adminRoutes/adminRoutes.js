import express from 'express'
import {adminLogin,usersList,editUser,userDelete} from '../../controller/AdminController/adminController.js'

const route = express.Router()


route.post('/login',adminLogin)
route.get('/users',usersList)
route.put('/edit_user/:id',editUser)
route.delete('/delete',userDelete)






export default route