import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import API from "../../../axiosConfig";
import Loading from "../../Loading/Loading";
import {
  deletUser,
  addUsersToState,
  clearUsersState,
  updateUserInState,
} from "../../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../../../componets/EditUserModal/EditModal";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../Utils/ConfirmationModal/ConfirmationModal";
const Dashboard = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModal, setEditModal] = useState(false);
const [isConfirm,setCorform]=useState(false)
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      const response = await API.get("/admin/users");
      if (response.data.success) {
        const users = response.data.data;
        dispatch(addUsersToState(users));
        setLoading(false);
      }
    };
    fetchDatas();
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
    setSelectedUser(null);
  };
  const handleSave = async (updatedUser) => {
    try {
      const response = await API.put(`/admin/edit_user/${updatedUser._id}`, {
        name: updatedUser.name,
        place: updatedUser.place,
        age: updatedUser.age,
      });
      if (response.data.success) {
        console.log(response.data.user);
        dispatch(
          updateUserInState({
            id: updatedUser._id,
            updateData: response.data.user,
          })
        );
        setEditModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const handleDelete = async (user) => {
  //   setCorform(true)
  //   const id = user._id;
  //   try {
  //     const responce = await API.delete("/admin/delete", {
  //       data: { id },
  //     });
  //     if(responce.data.success){
  //       dispatch(deletUser(id))
  //       toast.success(responce.data.message)
  //     }else{
  //       toast.error(responce.data.message)
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.message)
      
  //   }
  // };



  const handleDelete = async () => {
    if (!selectedUser) return;

    const id = selectedUser._id;
    try {
      const response = await API.delete("/admin/delete", {
        data: { id },
      });

      if (response.data.success) {
        dispatch(deletUser(id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setCorform(false); 
      setSelectedUser(null); 
    }
  };

  const handleOpenConfirm = (user) => {
    setSelectedUser(user); 
    setCorform(true); 
  };

  const handleCancel = () => {
    setCorform(false); // Close the confirmation modal
    setSelectedUser(null); // Clear the selected user
  };
  const handleLogout = () => {};
  return (
    <div className="admin-dashboard">
      {isLoading && <Loading />}
      <div className="top-bar flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="search-bar flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search Users..."
            className="px-4 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none">
            Search
          </button>
        </div>
        <div className="hello-admin flex items-center justify-center flex-1 text-center">
          <h3 className="text-2xl font-bold">Hello, Admin</h3>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Log Out
        </button>
      </div>

      <div className="users-list p-6 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Profile Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Joining Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">
                    <img
                      src={`http://localhost:3000${user.profile}`}
                      alt="Profile"
                      className="rounded-full w-12 h-12"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.place}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">
                    {new Date(Number(user.date)).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenConfirm(user)}
                      className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-2">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isEditModal && (
        <EditModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
      {isConfirm && (
          <ConfirmationModal
            isOpen={isConfirm}
            message="Are you sure you want to delete the user?"
            onConfirm={handleDelete}
            onCancel={handleCancel}
          />
        )}
    </div>
  );
};

export default Dashboard;
