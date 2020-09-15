import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const ConfirmModal = ({ clearAllNotes, setShowConfirm }) => {
  const clearTheNotes = async () => {
    await clearAllNotes();
    setShowConfirm();
  };
  return (
    <div className="confirm-modal">
      <p>Are you sure to clear all the Notes?</p>
      <div className="confirm-modal__btns">
        <button
          type="button"
          onClick={() => clearTheNotes()}
          className="confirm-modal__btns__yes"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm()}
          className="confirm-modal__btns__no"
        >
          No
        </button>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  clearAllNotes: PropTypes.func.isRequired,
  setShowConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;
