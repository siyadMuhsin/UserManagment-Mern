import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import validation from "../../validation";
import API from "../../axiosConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdminToken } from "../../redux/auth/authSlice";
import './AdminLogin.css'
import { Navigate, useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const isValid = validation(formData);
      if (!isValid) {
        setLoading(false);
        return;
      }
      const response = await API.post("/admin/login", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("adminToken", response.data.adminToken);
        dispatch(setAdminToken(response.data.adminToken));
        navigate('/admin/dashboard')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form-container">
    {isLoading && <Loading />}
    <form className="form-box pt-28">
      <h2 className="form-title text-3xl font-bold text-center mb-6">Admin Log In</h2>
      <div className="form-group mb-4">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
        <input
          className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
        <input
          className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleSubmit} type="submit" className="form-button w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Log In
      </button>
    </form>
  </div>
  )
};

export default AdminLogin;
