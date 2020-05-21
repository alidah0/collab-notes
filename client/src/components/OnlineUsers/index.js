import React from 'react';
import PropTypes from 'prop-types';
import onlineIcon from '../../assets/onlineIcon.png';

import './style.css';

const OnlineUsers = ({ users }) => (
  <div className="online-box">
    {/* {console.log('users from compo', users[0])} */}
    {users ? (
      <div>
        <p>Online Users:</p>
        <div>
          <p>
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
          </p>
        </div>
      </div>
    ) : null}
  </div>
);

OnlineUsers.propTypes = {
  users: PropTypes.arrayOf.isRequired,
};

export default OnlineUsers;
