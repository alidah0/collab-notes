import React from 'react';
import PropTypes from 'prop-types';
import onlineIcon from '../../assets/onlineIcon.png';

import './style.css';

const OnlineUsers = ({ users }) => (
  <div className="online-box">
    {users && (
      <div>
        <p>Online Users:</p>
        {users.length === 0 || users === undefined ? <p>fetching...</p> : null}
        <div>
          <span>
            {users.map((elem) => (
              <div key={elem.id}>
                <img
                  className="online-icon"
                  src={onlineIcon}
                  alt="online-icon"
                />
                {elem.nameq}
              </div>
            ))}
          </span>
        </div>
      </div>
    )}
  </div>
);

OnlineUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OnlineUsers;
