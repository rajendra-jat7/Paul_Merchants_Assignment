import React, { useState } from "react";
import "./SignUp.css"; // Import your custom CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation logic
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate form submission success
    setIsSubmitted(true);
    setError(null);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }, 2000);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-heading">Sign Up</h1>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Sign Up</button>

        {isSubmitted && !error && <p className="success-message">Sign-up successful! You can log in now.</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
