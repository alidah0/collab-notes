const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardsSchema = new Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    notes: {
      type: Array,
      default: [
        {
          title: 'Note Title',
          content: 'drag and drop in the basket to delete ',
          colour: 'pink',
          key: '123hj$%656',
        },
        {
          title: 'an example of the note',
          content: 'you can edit create',
          colour: 'blue',
          key: '456k$%6lMy45',
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('boards', boardsSchema);
