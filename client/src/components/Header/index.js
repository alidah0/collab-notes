/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = ({ handleNotAuthenticated, authenticate }) => {
  const handleLogoutClick = () => {
    window.open('http://localhost:4000/api/logout', '_self');
    handleNotAuthenticated();
  };
  const handleSignInClick = () => {
    window.open('http://localhost:4000/auth/google', '_self');
  };

  return (
    <ul className="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      {authenticate ? (
        <li onClick={handleLogoutClick}>Logout</li>
      ) : (
        <li onClick={handleSignInClick}>Login</li>
      )}
    </ul>
  );
};

Header.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  handleNotAuthenticated: PropTypes.func.isRequired,
};

export default Header;
