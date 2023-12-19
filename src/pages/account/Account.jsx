import React, { useState, useContext } from "react";
import "./account.scss"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from './../../context/AuthContext';

const Account = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEditedUser({ ...editedUser, image: imageFile });
  };

  const handleUpdate = () => {
    updateUser(editedUser);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="account-page">
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            value={editedUser.country}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
          {editedUser.image && (
            <img
              src={URL.createObjectURL(editedUser.image)}
              alt="Avatar"
              style={{ width: "100px", height: "100px" }}
            />
          )}
            <img
              src={user.img}
              alt="Avatar"
              className="avatar"
            />
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleUpdate}>Cập nhật thông tin</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
