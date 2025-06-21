import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [logininfo, setlogininfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { className, value } = e.target;
    setlogininfo((prev) => ({ ...prev, [className]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo)
      });
      const data = await res.json();
      alert(data.message || 'Signup successful!');
      setlogininfo({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="signup">
      <div className="signupcontainer">
        <p>USER SIGNUP</p>
        <form onSubmit={handleSubmit}>
          <div className="signupform">
            <label htmlFor="Inputusername">USER NAME</label>
            <input
              type="text"
              className="name"
              id="Inputusername"
              value={logininfo.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="InputEmail1">EMAIL ADDRESS</label>
            <input
              type="email"
              className="email"
              id="InputEmail1"
              value={logininfo.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="InputPassword">PASSWORD</label>
            <input
              type="password"
              className="password"
              id="InputPassword"
              value={logininfo.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signupsubmitbutton">
              SIGNUP
            </button>
          </div>
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;