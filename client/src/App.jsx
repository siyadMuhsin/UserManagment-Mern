import { useEffect, useState } from "react";
import SignupForm from "./pages/UserAuth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/UserAuth/Login";
import { ToastContainer } from "react-toastify";
import API from "./axiosConfig";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./redux/auth/authSlice";
import Loading from "./pages/Loading/Loading";
import "./App.css";
import Navbar from "./componets/Navbar/Navbar";
import AdminLogin from "./pages/Admin/AdminLogin";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userDetails = await API.get("/user-details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(userDetails.data.user));
          dispatch(setToken(token));
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
      <Navbar/>
      <div className="pt-25">

     
      <Routes>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
