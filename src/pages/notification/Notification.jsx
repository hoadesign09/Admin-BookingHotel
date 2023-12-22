import React, { useState, useEffect } from "react";
import useFetch from "./../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { NotificationInputs } from "../../formSource";

const Notification = () => {
  const [list, setList] = useState();
  const [info, setInfo] = useState({});
  const { data, loading, error, reFetch } = useFetch(`/notifications`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    setList(data);
  }, [data]);

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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="notification-container">
          <div className="right">
          <form>
              {NotificationInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
          <ul>
            {list &&
              list.map((notification) => (
                <ul key={notification._id}>
                  <li>Title: {notification.title}</li>
                  <li>Messgae: {notification.message}</li>
                </ul>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
