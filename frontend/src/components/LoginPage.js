import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function LoginPage() {
  // If you are using React Router, history is passed down to route components
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error message
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Send the username and password to the backend's /login endpoint
    try {
      const response = await fetch("http://localhost:3001/login", {
        // Adjust the URL based on where your backend server is hosted
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the backend sends back a JWT token
        console.log("Login successful:", data.token);

        // Save the token in localStorage or context for future requests
        localStorage.setItem("token", data.token);

        // Redirect to dashboard
        login(data.token);
        navigate("/dashboard"); // This is how you redirect using React Router
      } else {
        const data = await response;
        // If the credentials are invalid or any other error occurs
        console.log("Login failed:", data);
        setErrorMessage(data.message || "Invalid login attempt.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to connect to the server");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
