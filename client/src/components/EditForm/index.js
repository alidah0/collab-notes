import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const UpdateForm = ({ colour, title, content, editNote }) => {
  const [data, setData] = useState({
    colour,
    title,
    content,
    errorMessage: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    editNote(data.colour, data.title, data.content);
  };

  const style = { backgroundColor: data.colour };
  return (
    <div>
      {/* Form */}
      <div className="form-background">
        <form className="update-form" style={style}>
          <h2>Update Note</h2>
          <p>{data.errorMessage}</p>
          Update Title:
          <br />
          <input
            type="text"
            className="textfield"
            placeholder="Title"
            value={data.title}
            name="title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <br />
          Update Extra Notes:
          <br />
          <textarea
            className="textfield"
            placeholder="content"
            name="content"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
          />{' '}
          <br />
          <button
            type="submit"
            className="mainbtn"
            onClick={(e) => onSubmit(e)}
          >
            Update Note
          </button>
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
};

export default UpdateForm;
