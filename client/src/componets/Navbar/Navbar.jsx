import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/authSlice";
import ConfirmationModal from "../../Utils/ConfirmationModal/ConfirmationModal";
const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setModalOpen(true);
  };

  const onConfirm = () => {
    try {
      dispatch(logOut());
      navigate("/");
      setModalOpen(false);
    } catch (error) {}
  };
  const onCancel=()=>{
    setModalOpen(false)
  }
  return (
  <>
  
  <nav className="bg-blue-600 p-4 shadow-md z-50 fixed w-full" style={{ height: '70px'}}> 
  {/* Fixed height of navbar */}
  <div className="max-w-7xl mx-auto flex justify-between items-center" style={{ height: '100%' }}>
    <div className="text-white text-xl font-bold">
      <Link to="/">MyApp</Link>   
    </div>
    <div className="flex items-center space-x-4">
      <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
        Home
      </Link>
      {!isAuthenticated ? (
        <>
          <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
            Log In
          </Link>
          <Link to="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <span className="text-white">Welcome!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Log Out
          </button>
        </>
      )}
    </div>
  </div>
  <ConfirmationModal
    isOpen={isModalOpen}
    message="Are you sure you want to log out?"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
</nav>

  </>
);
   
};

export default Navbar;
