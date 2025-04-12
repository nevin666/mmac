
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ModernLogin.css";

const ModernLogin = ({ setIsAuthenticated }) => {
  const [isActive, setIsActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", signUpData);
      alert(response.data.message);
      setSignUpData({ name: "", email: "", password: "" });
      setIsActive(false); // Switch to sign-in after successful registration
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signin", signInData);
      alert(response.data.message);

      // Store token and email in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", signInData.email);
      localStorage.setItem('userId', response.data.userId);

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="body1">
      {/* Navbar */}
      <nav>
        <div className="nav-container">
          <div className="logo">
            Med<span>Expert</span>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/services">Services</Link></li>
          </ul>
        </div>
      </nav>

      {/* Login/Signup Form */}
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        {/* Sign-Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign-In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signInData.email}
              onChange={handleSignInChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />
            <button type="submit">Log in</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Hi...</h1>
              <p>Register with your details</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Enter your details to sign in</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;
