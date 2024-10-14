// frontend/src/App.js
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(`${API_URL}/login`);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Login failed");
    }
  };

  const checkCookie = async () => {
    try {
      const response = await axios.get(`${API_URL}/check-cookie`, {
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("No cookie found");
    }
  };

  return (
    <div>
      <h1>MERN Cookie Example</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={checkCookie}>Check Cookie</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
