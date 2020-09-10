import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LeaveBoard = ({ disconnet, leave }) => {
  const leaveTheBoard = () => {
    disconnet();
    leave();
  };
  return (
    <div>
      <button
        onClick={() => leaveTheBoard()}
        className="leave_board"
        type="button"
      >
        Leave Board
      </button>
    </div>
  );
};

LeaveBoard.propTypes = {
  disconnet: PropTypes.func.isRequired,
  leave: PropTypes.func.isRequired,
};

export default LeaveBoard;
