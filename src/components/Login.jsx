import React, { useState } from 'react';
import './login.css';
import { Link ,useNavigate} from 'react-router-dom';
import './login.css';

function Login() {
const navigate = useNavigate();
    
const [logininfo,setlogininfo]=useState({
    email:"",
    password:""
})
  const change = (e) => {
    const { name, value } = e.target;
    setlogininfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

const handleLogin = async (e) => {
  
 

    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo)
      });

      const data = await res.json();
    
      if (res.ok) {
    
        alert(data.message || 'Login successful!');
        setlogininfo({ email: "", password: "" });

        navigate('/'); // Or whatever route you want to go to
      } else {
        alert(data.message || 'Login failed');
      }

     // no name needed here
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
};
 
  return (
    <div className="login">
      <div className="logincontainer">
       
        <p>
          USER LOGIN
        </p>
       <form>
  <div className='loginform'>
            <label htmlFor="InputEmail1">EMAIL ADDRESS</label>
            <input
              type="email"
              className="email"
              id="InputEmail1"
              name="email"
              value={logininfo.email}
              onChange={change}
            />

            <label htmlFor="InputPassword">PASSWORD</label>
            <input
              type="password"
              className="password"
              id="InputPassword"
              name="password"
              value={logininfo.password}
              onChange={change}
            />
  
 
  <button type="submit" className="loginsubmitbutton" onClick={handleLogin} >login</button>
  </div>
  <p>Doesnot have acount?</p>
<Link to='/signup'>Signup</Link>
 
</form>
      </div>
    </div>
  )
}

export default Login