import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noteValidate from '../../utils/noteValidate';

import './style.css';

const UpdateForm = ({ colour, title, content, editNote, closeForm }) => {
  const [data, setData] = useState({
    colour,
    title,
    content,
    errorMessage: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    noteValidate(data)
      .then(() => editNote(data.colour, data.title, data.content))
      .catch(({ errors }) => setError(errors[0]));
  };

  const style = { backgroundColor: data.colour };
  return (
    <div>
      <div className="form-background">
        <form className="update-form" style={style}>
          <h3>Update Note</h3>
          <p className="error-msg">{error}</p>
          Update Title
          <input
            type="text"
            maxLength="31"
            className="textfield"
            placeholder="Title"
            value={data.title}
            name="title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          Update Extra Notes
          <textarea
            className="textfield"
            maxLength="120"
            placeholder="content"
            name="content"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
          />
          <div style={{ display: 'flex' }}>
            <button
              type="submit"
              className="update-form__btn"
              onClick={(e) => onSubmit(e)}
            >
              Update Note
            </button>
            <button
              className="update-form__btn"
              type="button"
              onClick={() => closeForm()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateForm.propTypes = {
  colour: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  editNote: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default UpdateForm;
