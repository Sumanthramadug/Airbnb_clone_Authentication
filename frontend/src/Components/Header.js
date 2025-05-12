import React from 'react';
import '../Styles/header.css';
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div onClick={()=>navigate("/")} className='logo'>
        <span className="material-symbols-outlined">flight</span>
        <span >airbnb</span>
      </div>

      <div className='locate'>
        <div>Anywhere</div>
        <span className="divider"></span>
        <div>Any week</div>
        <span className="divider"></span>
        <div>Add guests</div>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <div className='header-right'>
        <p>Airbnb your home</p>
        <i className="fa-solid fa-globe"></i>
        <div onClick={()=>{navigate("/login")}} className='user-menu'>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
