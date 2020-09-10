/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import Google from '../../assets/google.png';
import Logo from '../../assets/logo.png';
import spinner from '../../assets/spinner.svg';

import './style.css';

const Header = ({
  handleNotAuthenticated,
  authenticate,
  profileIMG,
  profileName,
  loading,
}) => {
  const handleLogoutClick = () => {
    window.open('/api/logout', '_self');
    handleNotAuthenticated();
  };
  const handleSignInClick = () => {
    window.open('/auth/google', '_self');
  };

  return (
    <ul className="menu">
      <li>
        <img className="menu__link__logo" src={Logo} alt="logo-title" />
      </li>
      {authenticate ? (
        <div className="menu__account">
          <img className="profile" src={profileIMG} alt="profile" />
          <p className="google_name">{profileName}</p>
          <li className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </li>
        </div>
      ) : (
        <li onClick={handleSignInClick}>
          {loading ? (
            <div className="menu__google">
              <p>Signing in..</p>
              <img
                className="menu__google__loading"
                src={spinner}
                alt="loading-spinner"
              />
            </div>
          ) : (
            <img
              className="google-sign-btn"
              src={Google}
              alt="google-sign-in"
            />
          )}
        </li>
      )}
    </ul>
  );
};

Header.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  handleNotAuthenticated: PropTypes.func.isRequired,
  profileIMG: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
