import React, { useState, useEffect } from "react";
import useFetch from "./../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Log = () => {
  const pageSize = 5; 
  const [currentPage, setCurrentPage] = useState(1); 
  const { data: activityLogs, loading, error, reFetch } = useFetch(`/logs?page=${currentPage}&limit=${pageSize}`);

  console.log(activityLogs.userId)
  useEffect(() => {
    reFetch(); 
  }, [currentPage]); 
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); 
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <h3>Admin Dashboard</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching data: {error.message}</p>
          ) : (
            <div>
              <h4>User Activity Logs</h4>
              <ul>
                {activityLogs.map((log, index) => (
                  <li key={index}>
                    <p>Timestamp: {log.timestamp}</p>
                    <p>User ID: {log.userId}</p>
                    <p>Endpoint: {log.endpoint}</p>
                    <p>Method: {log.method}</p>
                  </li>
                ))}
              </ul>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous Page
              </button>
              <button onClick={nextPage}>Next Page</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Log;
