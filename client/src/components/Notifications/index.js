import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Notifications({ text }) {
  return (
    <div>
      <p className="notify">{text}</p>
    </div>
  );
}

Notifications.defaultProps = {
  text: '',
};

Notifications.propTypes = {
  text: PropTypes.string,
};

export default Notifications;
