import { useEffect, useState, lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/UserAuth/Login"));
const SignupForm = lazy(() => import("./pages/UserAuth/Signup"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Dashboard =lazy(()=>import('./pages/Admin/Dashboard/Dashboard'))
import { ToastContainer } from "react-toastify";
import API from "./axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "./redux/auth/authSlice";
import Loading from "./pages/Loading/Loading";
import Navbar from "./componets/Navbar/Navbar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const userDetails = await API.get("/user-details", {
            headers: { Authorization: `Bearer ${token}` },
          });


          if(userDetails.data.user){
            dispatch(setUser(userDetails.data.user));
            dispatch(setToken(token));
          }else{
            localStorage.removeItem('userToken')
          }
         
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [dispatch]);
  return (
    <BrowserRouter>
      {loading && <Loading />}
      <ToastContainer theme="dark" />
      <div className="pt-25">
        <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
         <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
