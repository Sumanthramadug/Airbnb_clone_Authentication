import React, { useState } from 'react';
import '../Styles/newPassword.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {

  const navigate=useNavigate();
  const location=useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const email = location.state?.email

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    }
    try{
       const {data} = await axios.post('http://localhost:8000/users/newPassword',{email,password},{withCredentials:true});
       if(data.success){
          toast.success(data.message);
          navigate("/");
       }
       else{
          toast.error(data.message);
       }
    }
    catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="form-title">Set a New Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label" htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" onClick={handleSubmit} className="input" style={{ backgroundColor: "#e74c3c", color: "#fff", border: "none", fontSize: "1rem", padding: "1rem", cursor: "pointer", borderRadius: "8px" }}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
