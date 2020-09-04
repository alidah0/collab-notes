import React from 'react';
import PropTypes, { string } from 'prop-types';
import './style.css';

const Notifications = ({ text }) => {
  return (
    <div>
      {text &&
        text.map((p) => (
          <p className="notify" key={p}>
            {p}
          </p>
        ))}
    </div>
  );
};

Notifications.defaultProps = {
  text: [],
};

Notifications.propTypes = {
  text: PropTypes.arrayOf(string),
};

export default Notifications;
