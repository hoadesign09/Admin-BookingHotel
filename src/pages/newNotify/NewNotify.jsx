import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { NotificationInputs } from "../../formSource";
import "./newNotify.css";

const NewNotify = ({inputs, title}) => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleClick = async (e) => {
    e.preventDefault()
    try {
        const newNotification = {
            ...info,
        }
        await axios.post("/notifications", newNotification)
    }
    catch (err) {

    }
}
    
  return (
    <div className="new-2">
      <Sidebar />
      <div className="newContainer-2">
        <Navbar />
        <div className="top-2">
          <h1>Add New Notifications</h1>
        </div>
          <div className="right-2">
          <form>
              {NotificationInputs.map((input) => (
                <div className="formInput-2" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default NewNotify;
