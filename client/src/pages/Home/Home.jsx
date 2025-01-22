import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../axiosConfig";
import "./Home.css";
import { toast } from "react-toastify";
import { setUser } from "../../redux/auth/authSlice";
import Loading from "../../pages/Loading/Loading";
const Home = () => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
   

    if (selectedImage) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await API.post(`/add-image/${user._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        });

        if (response.data.success) {
          console.log(response.data);
          dispatch(setUser(response.data.user));

          toast.success(response.data.message);
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("An error occurred while uploading the image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const timstamp = Number(user?.date);
  const newDate = new Date(timstamp).toLocaleDateString("en-US");
  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-4 mt-[70px]">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative">
              {/* Check if the user has a profile image */}
              {user &&
                (user.profile ? (
                  <img
                    src={`http://localhost:3000${user.profile}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  />
                ) : (
                  // If no image is available, show the file input
                  <div className="relative">
                    <div className="w-24 h-24 flex justify-center items-center bg-gray-100 rounded-full border-4 border-white shadow-md">
                      <input
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <span className="text-sm text-gray-500">
                        Choose Image
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Welcome Home!
          </h1>
          {user ? (
            <p className="text-lg text-gray-700 mt-4">Hello, {user.name}</p>
          ) : (
            <p className="text-lg text-gray-700 mt-4">User not found</p>
          )}
        </div>

        {user && (
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="space-y-2">
              <p className="text-lg text-gray-800">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Age:</strong> {user.age}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Place:</strong> {user.place}
              </p>
              <p>
                <strong>Join Date:</strong> {newDate}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
