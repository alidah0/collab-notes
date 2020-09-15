import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from '../ConfirmModal';
import Trash from '../../assets/trash.svg';
import addNote from '../../assets/addNote.svg';
import LeaveSVG from '../../assets/logout.svg';
import onlineSVG from '../../assets/online_users.svg';

import './style.css';

const Toolbar = ({
  isFormClicked,
  leaveBoard,
  clearAllNotes,
  isOnlineClicked,
  usersLength,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="App__toolbar">
      {showConfirm ? (
        <ConfirmModal
          setShowConfirm={() => setShowConfirm(false)}
          clearAllNotes={clearAllNotes}
        />
      ) : null}
      <div className="App__toolbar__wrapper">
        <div
          role="presentation"
          onClick={() => isFormClicked()}
          className="App__toolabr__elem"
        >
          <img className="App__toolabr__img" src={addNote} alt="add-Note" />
          <p>Add Note</p>
        </div>
        <div
          role="presentation"
          onClick={() => isOnlineClicked()}
          className="App__toolabr__elem"
        >
          <img
            className="App__toolabr__img"
            src={onlineSVG}
            alt="online-users"
          />
          <p>{usersLength} Online Users</p>
        </div>
        <div
          role="presentation"
          onClick={() => setShowConfirm(true)}
          className="App__toolabr__elem"
        >
          <img className="App__toolabr__img" src={Trash} alt="delete" />
          <p>Clear All</p>
        </div>
      </div>
      <div
        role="presentation"
        onClick={() => leaveBoard()}
        className="App__toolabr__last"
      >
        <img
          className="App__toolabr__img"
          src={LeaveSVG}
          alt="leave-board-img"
        />
        <p>Leave Board</p>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  isFormClicked: PropTypes.func.isRequired,
  leaveBoard: PropTypes.func.isRequired,
  clearAllNotes: PropTypes.func.isRequired,
  isOnlineClicked: PropTypes.func.isRequired,
  usersLength: PropTypes.number.isRequired,
};

export default Toolbar;
