import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Google from '../../assets/google.png';
import Logo from '../../assets/logo.png';
import spinner from '../../assets/main_spinner.svg';
import noAvatar from '../../assets/noAvatar.svg';
import downArrow from '../../assets/downArrow.svg';
import logout from '../../assets/logout.svg';

import './style.css';

const setDefaultIMG = (e) => {
  e.target.src = noAvatar;
};

const Navbar = ({
  handleNotAuthenticated,
  authenticate,
  profileIMG,
  profileName,
  loading,
}) => {
  const [modal, setModal] = useState(false);
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
          <img
            className="profile"
            onError={(e) => setDefaultIMG(e)}
            src={profileIMG}
            alt="profile"
          />
          <p className="google_name">{profileName}</p>
          <div
            className="menu_arrow"
            onClick={() => (modal ? setModal(false) : setModal(true))}
            role="presentation"
          >
            <img
              className={
                modal ? 'menu_arrow__upArrow' : 'menu_arrow__downArrow'
              }
              src={downArrow}
              alt="down-arrow"
            />
          </div>
          <div
            onClick={handleLogoutClick}
            className={modal ? 'menu__account__modal' : 'hide'}
            role="presentation"
          >
            <div className="logout-btn">
              <img className="logout-btn__svg" src={logout} alt="logout-icon" />
              <p>Logout</p>
            </div>
          </div>
        </div>
      ) : (
        <div role="presentation" onClick={handleSignInClick}>
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
        </div>
      )}
    </ul>
  );
};

Navbar.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  handleNotAuthenticated: PropTypes.func.isRequired,
  profileIMG: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Navbar;
