import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../../validation";
import { ToastContainer, toast } from "react-toastify";
import API from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/auth/authSlice";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
const Login = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    if(isAuthenticated){
      navigate('/')
    }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    // Validate the form data
    const isValid = validation(formData);
    if (!isValid) {
      setLoading(false); // End loading if form is invalid
      return;
    }

    try {
      // Make API call to login
      const response = await API.post("/login", formData);
      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem("token", token);

        dispatch(setToken(token));

        const userDetailsResponse = await API.get("/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(userDetailsResponse.data.user));

        toast.success(response.data.message);

        navigate("/");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in.");
    } finally {
      setLoading(false); // Stop loading no matter what
    }
  };
  return (
    <div className="form-container">
    {isLoading && <Loading />}
    <form className="form-box">
      <h2 className="form-title">Log In</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
        className="w-[100%] h-10"  
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
        className="w-[100%] h-10"
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleSubmit} type="submit" className="form-button">
        Log In
      </button>
      <p className="form-footer">
        Don't have an account?{' '}
        <Link to="/signup" className="form-link">
          Sign up
        </Link>
      </p>
    </form>
  </div>
  );
};

export default Login;
