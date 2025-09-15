import React from 'react';
import {NavLink} from 'react-router-dom';
import {IoHomeOutline, IoCreateOutline, IoPersonOutline} from 'react-icons/io5';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/recipes/editor" className="nav-link">
        <IoCreateOutline className="nav-icon" />
        <span>레시피 등록</span>
      </NavLink>
      <NavLink to="/" end className="nav-link">
        <IoHomeOutline className="nav-icon" />
        <span>홈</span>
      </NavLink>
      <NavLink to="/profile" className="nav-link">
        <IoPersonOutline className="nav-icon" />
        <span>내 정보</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
