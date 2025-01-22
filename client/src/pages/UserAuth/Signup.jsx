import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import validation from "../../validation";
import API from "../../axiosConfig";
import { useSelector } from "react-redux";
import Navbar from "../../componets/Navbar/Navbar";

const SignupForm = () => {
  const isAtuhenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAtuhenticated){
      navigate('/')
    }
  },[isAtuhenticated,navigate])
 
  const [formData, setFormData] = useState({
    name: " ",
    email: " ",
    place: " ",
    age: " ",
    password: " ",
    confirmPassword: " ",
  });
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let isValid = validation(formData);

      if (!isValid) {
        setLoading(false);
        return;
      }

      const response = await API.post("/signup", formData);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(()=>{
          navigate("/login");
        },1000)
        
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
   
   <ToastContainer theme="dark" />
   <Navbar/>
   <div className="form-container bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-8">
  <form className="form-box bg-white shadow-lg p-10 rounded-xl">
    <h2 className="form-title text-3xl font-bold text-gray-700 mb-6 text-center">Sign Up</h2>
    <div className="form-group mb-6">
      <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        className="form-input"
        placeholder="Enter your name"
      />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        className="form-input"
        placeholder="Enter your email"
      />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="place" className="text-sm font-medium text-gray-600">Place</label>
      <input
        type="text"
        name="place"
        onChange={handleChange}
        id="place"
        className="form-input"
        placeholder="Enter your place"
      />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="age" className="text-sm font-medium text-gray-600">Age</label>
      <input
        type="number"
        name="age"
        onChange={handleChange}
        id="age"
        className="form-input"
        placeholder="Enter your age"
      />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
      <input
        name="password"
        type="password"
        onChange={handleChange}
        id="password"
        className="form-input"
        placeholder="Enter your password"
      />
    </div>
    <div className="form-group mb-6">
      <label htmlFor="confirm-password" className="text-sm font-medium text-gray-600">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        name="confirmPassword"
        onChange={handleChange}
        className="form-input"
        placeholder="Confirm your password"
      />
    </div>

    <button onClick={handleSubmit} type="submit" className="form-button">
      {isLoading ? "Loading..." : "Sign Up"}
    </button>
    <p className="form-footer mt-6 text-center text-gray-600">
      Already have an account? <Link to="/login" className="form-link">Log in</Link>
    </p>
  </form>
</div>
    </>
  );
};

export default SignupForm;
