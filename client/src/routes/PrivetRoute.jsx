import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({children}) => {
    const isAuthenticated= useSelector((state)=>(state.auth.isAdmin))
  
    return isAuthenticated ? children : <Navigate to={'/admin'}/>
}

const LoginRoute=({children}) =>{
   const isAuthenticted=useSelector((state)=>state.auth.isAdmin)

    return isAuthenticted ? <Navigate to={'/admin/dashboard'}/>:children

}
export {
    PrivetRoute,LoginRoute
} 