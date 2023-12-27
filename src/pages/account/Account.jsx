import React, { useState, useContext } from "react";
import "./account.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
const Account = () => {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    setInfo({
      username: user.username || "",
      email: user.email || "",
      country: user.country || "",
      phone: user.phone || "",
      img: user.img || "",
    });
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrl = info.img; // Giữ nguyên URL ảnh cũ

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dfsarmr16/image/upload",
          data
        );

        const { url } = uploadRes.data;
        imageUrl = url; // Lấy URL của ảnh mới từ response
      } catch (err) {
        console.log(err);
      }
    }

    const updateUser = {
      username: info.username,
      email: info.email,
      country: info.country,
      phone: info.phone,
      img: imageUrl, // Sử dụng URL ảnh mới hoặc cũ
    };

    try {
      await axios.put(`/users/${user._id}`, updateUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="account-page">
          <input
            className="ip-acc"
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={info.username}
            onChange={handleChange}
          />
          <input
            className="ip-acc"
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={info.email}
            onChange={handleChange}
          />
          <input
            className="ip-acc"
            type="text"
            id="country"
            placeholder="your country"
            value={info.country}
            onChange={handleChange}
          />
          <input
            className="ip-acc"
            type="text"
            name="phone"
            id="phone"
            placeholder="your phone"
            value={info.phone}
            onChange={handleChange}
          />
          {user.image && (
            <img
              src={URL.createObjectURL(info.image)}
              alt="Avatar"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <div className="user-img">
            <img src={info.img} alt="Avatar" className="avatar" />

            <input
              className="ip-acc"
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button className="btn-acc" onClick={handleClick}>
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
