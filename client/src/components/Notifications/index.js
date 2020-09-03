import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Notifications({ text }) {
  return (
    <div>
      {text.map((p) => (
        <p className="notify" key={p}>
          {p}
        </p>
      ))}
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
