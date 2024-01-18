import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



const AdminProtectedRoute = ({children}) => {
    const {loading, isAuthenticated, user} = useSelector(state => state.user)
const navigate = useNavigate()

useEffect(()=> {

if(loading === false){
        if(!isAuthenticated) {
            return navigate("/login")
        } else if(user.role !== "Admin") {
            return navigate("/")
        }
    }
 
},[])

    return children
}

export default AdminProtectedRoute