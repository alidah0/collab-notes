import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

const LeaveBoard = ({ disconnet }) => (
  <div>
    <Link to="/">
      <button onClick={disconnet} className="leave_board" type="button">
        Leave Board
      </button>
    </Link>
  </div>
);

LeaveBoard.propTypes = {
  disconnet: PropTypes.func.isRequired,
};

export default LeaveBoard;
