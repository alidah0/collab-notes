/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Google from '../../assets/google.png';
import './style.css';

const Header = ({ handleNotAuthenticated, authenticate, profileIMG }) => {
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
        <Link className="link" to="/">
          Collab Notes
        </Link>
      </li>
      {authenticate ? (
        <div className="wrapp">
          <li onClick={handleLogoutClick}>
            Logout
            <img className="profile" src={profileIMG} alt="profile" />
          </li>
        </div>
      ) : (
        <li onClick={handleSignInClick}>
          <img src={Google} alt="google-sign-in" />
        </li>
      )}
    </ul>
  );
};

Header.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  handleNotAuthenticated: PropTypes.func.isRequired,
  profileIMG: PropTypes.string.isRequired,
};

export default Header;
