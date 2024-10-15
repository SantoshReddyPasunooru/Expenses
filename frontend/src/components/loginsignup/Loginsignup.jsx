import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginsignup.css';

const Loginsignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true); // Start loading
    try {
      await axios.post('http://localhost:9000/signup', {
        firstname, lastname, email, password: password1
      });
      setLoading(false); // Stop loading
      setAction("Login");
    } catch (error) {
      setLoading(false); // Stop loading
      alert("Signup failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:9000/login', { email, password: password1 });
      setLoading(false); // Stop loading
      if (response.data === "Logged In successfully") {
        navigate('/home'); // Redirect to the homepage
      } else {
        alert("Invalid Credentials or User does not exist.");
      }
    } catch (error) {
      setLoading(false); // Stop loading
      alert("Login failed!");
    }
  };

  return (
      <div className="login-signup-container">
        <div className="background-image"></div>
        <div className="overlay"></div>

        <div className="content-box">
          {loading ? ( // Show spinner while loading
              <div className="spinner"></div>
          ) : (
              <>
                <text className="logintitle">{action === "Login" ? "Login" : "Sign Up"}</text>
                <form onSubmit={action === "Login" ? handleLogin : handleSignUp}>
                  {action === "Sign Up" && (
                      <>
                        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                      </>
                  )}
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                  {action === "Sign Up" && (
                      <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                  )}
                  <button type="submit">{action === "Login" ? "Login" : "Sign Up"}</button>
                </form>
                <div className="toggle-action">
                  {action === "Login" ? (
                      <p>Don't have an account? <span onClick={() => setAction("Sign Up")}>Sign Up</span></p>
                  ) : (
                      <p>Already have an account? <span onClick={() => setAction("Login")}>Login</span></p>
                  )}
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default Loginsignup;
