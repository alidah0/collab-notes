import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo.png';

import './style.css';

const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <img src={Logo} alt="title-logo" />
            <h1>404</h1>
          </div>
          <h2>Oops, The Page you are looking for cannot be found!</h2>

          <div>
            <button
              type="button"
              onClick={() => history.push('/')}
              className="notfound__btn"
            >
              Return To Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
