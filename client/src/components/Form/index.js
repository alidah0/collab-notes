import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noteValidate from '../../utils/noteValidate';

import './style.css';

const Form = ({ createPostit }) => {
  const [data, setData] = useState({
    title: '',
    content: '',
    key: '',
  });
  const [ranCol, setRanCol] = useState('yellow');
  const [messages, setMsg] = useState([]);
  const [Loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const newdata = data;

    noteValidate(newdata)
      .then(() => {
        setLoading(true);
        setMsg([]);
        createPostit(ranCol, data.title, data.content);
        setData({
          colour: 'yellow',
          title: '',
          content: '',
          key: '',
        });
      })
      .then(() => setLoading(false))
      .catch(({ errors }) => setMsg(errors));
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
        <div className="form__messages">
          {messages.map((msg, i) => (
            <p key={i.toString()}>{msg}</p>
          ))}
        </div>
        <input
          maxLength="31"
          type="text"
          placeholder="Title"
          value={data.title}
          name="title"
          onChange={(e) => handleFormInput(e)}
        />

        <textarea
          maxLength="120"
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
            role="presentation"
          >
            select a color
          </div>
          <button
            disabled={Loading}
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
