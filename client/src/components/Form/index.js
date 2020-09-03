/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Form = ({ createPostit }) => {
  const [data, setData] = useState({
    errorMessage: '',
    title: '',
    content: '',
    key: '',
  });
  const [ranCol, setRanCol] = useState('yellow');

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.content === '' || data.title === '') {
      setData({ errorMessage: 'All fields are required' });
    } else {
      createPostit(ranCol, data.title, data.content);
      setData({
        colour: 'yellow',
        title: '',
        content: '',
        key: '',
        errorMessage: '',
      });
    }
  };
  const generateColor = (e) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    e.target.style.backgroundColor = randomColor;
    setRanCol(e.target.style.backgroundColor);
  };

  const handleFormInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form className="form">
        <p>{data.errorMessage}</p>
        <input
          type="text"
          placeholder="Title"
          value={data.title}
          name="title"
          onChange={(e) => handleFormInput(e)}
        />

        <textarea
          placeholder="Details about the Notes"
          value={data.content}
          name="content"
          onChange={(e) => handleFormInput(e)}
        />
        <div>
          <div
            className="randColor"
            onClick={generateColor}
            style={{ backgroundColor: 'yellow' }}
          >
            select a color
          </div>
          <button
            type="button"
            className="mainbtn"
            onClick={(e) => onSubmit(e)}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  createPostit: PropTypes.func.isRequired,
};

export default Form;
