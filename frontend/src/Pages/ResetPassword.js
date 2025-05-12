import React, { useState } from 'react';
import '../Styles/forgotpassword.css';  
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://airbnb-clone-authentication.onrender.com/users/forgotPassword',
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setShowOtpField(true); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const checkOtpHandler = async () => {
    try {
      const { data } = await axios.post(
        'https://airbnb-clone-authentication.onrender.com/users/verifyotp',
        { email, otp },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/newPassword",{state:{email}})
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.mesaage);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-heading">Forgot your password?</h2>
        <p className="forgot-password-subtext">
          Enter the email address associated with your account and we’ll send you an OTP to reset your password.
        </p>
        <form className="forgot-password-form" onSubmit={submitHandler}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="forgot-password-input"
            required
          />
          <button type="submit" className="forgot-password-button">
            Send OTP
          </button>
        </form>

        {showOtpField && (
          <div className="otp-section">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="forgot-password-input"
              required
            />
            <button onClick={checkOtpHandler} className="forgot-password-button">
              Check OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
