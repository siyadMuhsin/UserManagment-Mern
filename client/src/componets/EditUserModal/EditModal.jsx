import React, { useState } from 'react';
import validation from '../../validation';
import ConfirmationModal from '../../Utils/ConfirmationModal/ConfirmationModal';
import './EditModal.css'
const EditModal = ({ user, onClose, onSave }) => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const [isConfirm, setConfirm] = useState(false);
  
    const handleChange = (e) => {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSave = () => {
      const formData = {
        name: updatedUser.name,
        age: updatedUser.age,
        place: updatedUser.place,
      };
      const isValid = validation(formData); 
      if (isValid) {
        setConfirm(true); 
      }
    };
  
    const onConfirm = () => {
      onSave(updatedUser); 
      setConfirm(false); 
      onClose(); 
    };
  
    const onCancel = () => {
      setConfirm(false); 
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="modal-title">Edit User</h2>
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              readOnly
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Place:</label>
            <input
              type="text"
              name="place"
              value={updatedUser.place}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Age:</label>
            <input
              type="number"
              name="age"
              value={updatedUser.age}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="modal-actions">
            <button onClick={onClose} className="cancel-button">Cancel</button>
            <button onClick={handleSave} className="save-button">Save</button>
          </div>
        </div>
        {isConfirm && (
          <ConfirmationModal
            isOpen={isConfirm}
            message="Are you sure you want to edit the user?"
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </div>
    );
  };
  

export default EditModal;
